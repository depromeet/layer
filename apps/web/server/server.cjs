require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");
const CryptoJS = require("crypto-js");

// SEO 라우트 정책 단일 소스 — vite.config.ts와 공유
const {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  INVITE_OG_IMAGE,
  NOINDEX_PATH_PREFIXES,
} = require("../seo.config.cjs");

// 라우트 정의 단일 소스 — src/router/index.tsx와 공유
const { KNOWN_ROUTE_PATTERNS } = require("../routes.cjs");

const app = express();

// Vite 빌드 결과물(`dist/`)에서 정적 자산을 먼저 응답.
// HTML 요청만 catch-all로 전달되어 cheerio 메타 인젝션을 거칩니다.
const distPath = path.resolve(__dirname, "../dist");
app.use(express.static(distPath));

// AES 복호화 — `/space/join/:id`의 암호화된 space ID를 풀어 백엔드 조회에 사용
const CRYPTO_KEY = process.env.VITE_CRYPTO_KEY;
const VECTOR_KEY = process.env.VITE_VECTOR_KEY;

const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Utf8.parse(VECTOR_KEY);

function decryptId(encryptedId) {
  const word_array = CryptoJS.enc.Base64.parse(encryptedId);
  const decoding = word_array.toString(CryptoJS.enc.Utf8);
  const decrypted = CryptoJS.AES.decrypt(decoding, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Injects SEO meta tags into HTML using Cheerio.
 * Adds data-rh="true" for react-helmet-async compatibility.
 *
 * @param {string} html - Source HTML.
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} [opts.image] - OG image URL. Falls back to existing meta if omitted.
 * @param {string} opts.url - Canonical URL.
 * @param {boolean} [opts.noindex] - When true, sets robots meta to noindex,nofollow.
 */
function injectMeta(html, { title, description, image, url, noindex }) {
  const $ = cheerio.load(html);

  $('title').text(title);
  $('meta[name="description"]').attr('content', description).attr('data-rh', 'true');
  $('meta[property="og:title"]').attr('content', title).attr('data-rh', 'true');
  $('meta[property="og:description"]').attr('content', description).attr('data-rh', 'true');
  $('meta[property="og:url"]').attr('content', url).attr('data-rh', 'true');
  if (image) {
    $('meta[property="og:image"]').attr('content', image).attr('data-rh', 'true');
  }
  $('meta[name="twitter:title"]').attr('content', title).attr('data-rh', 'true');
  $('meta[name="twitter:description"]').attr('content', description).attr('data-rh', 'true');
  if (image) {
    $('meta[name="twitter:image"]').attr('content', image).attr('data-rh', 'true');
  }

  // robots 메타: noindex 라우트는 검색엔진 차단
  $('meta[name="robots"]').attr(
    'content',
    noindex ? 'noindex, nofollow' : 'index, follow'
  ).attr('data-rh', 'true');

  // Dynamic canonical URL injection (noindex 페이지에는 canonical 미주입 — 인덱싱 신호 혼란 방지)
  if (!noindex) {
    $('head').append(`<link rel="canonical" href="${url}" data-rh="true" />`);
  }

  return $.html();
}

/**
 * 정적 라우트별 메타 정보.
 *
 * key: `req.path` (query string 제외)
 *
 * 공개 페이지(인덱싱 허용) 엔트리만 명시합니다.
 * 비공개 페이지는 `NOINDEX_PATH_PREFIXES` (seo.config.cjs)의 prefix 매칭으로 일괄 처리됩니다.
 *
 * @see apps/web/src/router/index.tsx  라우터 정의와 일치해야 함
 */
const STATIC_ROUTE_META = {
  "/": {
    title: "성장하는 당신을 위한 회고 서비스, Layer",
    description:
      "회고 작성부터 AI 분석까지, Layer에서 KPT·5F 등 다양한 템플릿으로 개인·팀 회고를 시작해보세요.",
    image: DEFAULT_OG_IMAGE,
  },
  "/login": {
    title: "로그인 | Layer",
    description: "카카오, 구글 계정으로 간편하게 Layer에 로그인하세요.",
    image: DEFAULT_OG_IMAGE,
  },
  "/template": {
    title: "회고 템플릿 모음 | Layer",
    description: "KPT, 5F, Mad Sad Glad 등 검증된 회고 템플릿을 무료로 만나보세요.",
    image: DEFAULT_OG_IMAGE,
  },
  // 데스크탑 진입점은 모바일과 동일 콘텐츠 — canonical은 `/desktop/x` → `/x`로 정규화됨
  "/desktop": {
    title: "성장하는 당신을 위한 회고 서비스, Layer",
    description:
      "회고 작성부터 AI 분석까지, Layer에서 KPT·5F 등 다양한 템플릿으로 개인·팀 회고를 시작해보세요.",
    image: DEFAULT_OG_IMAGE,
  },
  "/desktop/login": {
    title: "로그인 | Layer",
    description: "카카오, 구글 계정으로 간편하게 Layer에 로그인하세요.",
    image: DEFAULT_OG_IMAGE,
  },
};

// KNOWN_ROUTE_PATTERNS는 routes.cjs에서 derive (src/router/index.tsx의 ROUTES와 단일 소스)

function isKnownRoute(reqPath) {
  return KNOWN_ROUTE_PATTERNS.some((re) => re.test(reqPath));
}

// NOINDEX_PATH_PREFIXES는 seo.config.cjs에서 관리 (vite.config.ts의 sitemap exclude와 공유)

const DEFAULT_META = {
  title: "성장하는 당신을 위한 회고 서비스, Layer",
  description:
    "회고 작성부터 AI 분석까지, Layer에서 KPT·5F 등 다양한 템플릿으로 개인·팀 회고를 시작해보세요.",
  image: DEFAULT_OG_IMAGE,
};

function readIndexHtml() {
  const filePath = path.join(distPath, "index.html");
  return fs.readFileSync(filePath, "utf8");
}

function getCanonicalUrl(reqPath) {
  // /desktop prefix 정규화 + 끝 슬래시 제거
  let canonicalPath = reqPath.replace(/^\/desktop/, '') || '/';
  if (canonicalPath.length > 1 && canonicalPath.endsWith('/')) {
    canonicalPath = canonicalPath.slice(0, -1);
  }
  return `${BASE_URL}${canonicalPath}`;
}

function isNoindexPath(reqPath) {
  return NOINDEX_PATH_PREFIXES.some((prefix) => reqPath.startsWith(prefix));
}

function resolveRouteMeta(reqPath) {
  if (STATIC_ROUTE_META[reqPath]) {
    return STATIC_ROUTE_META[reqPath];
  }
  if (isNoindexPath(reqPath)) {
    return { noindex: true };
  }
  return null;
}

/**
 * 정적 라우트 결과 캐시 (cheerio 파싱/직렬화 비용 절감).
 * key: `${path}` — 정적 라우트와 noindex 분기는 결정론적이므로 캐싱 안전.
 * 동적 라우트(/space/join/:id)는 캐시 대상 아님.
 */
const META_CACHE = new Map();
const META_CACHE_MAX = 100;

function setMetaCache(key, value) {
  if (META_CACHE.size >= META_CACHE_MAX) {
    const firstKey = META_CACHE.keys().next().value;
    META_CACHE.delete(firstKey);
  }
  META_CACHE.set(key, value);
}

/**
 * Cache-Control 헤더 정책
 * - 동적(개인화 가능): no-store
 * - 정적(SEO 메타 페이지): edge에서 1시간, 브라우저 5분, stale-while-revalidate 1일
 * - noindex 페이지: edge 1분 (인증 게이트라 자주 변경될 일 적음)
 */
function setCacheHeaders(res, kind) {
  if (kind === "static-public") {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  } else if (kind === "static-noindex") {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=60');
  } else {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
  }
}

/**
 * 스페이스 초대 링크 — `/space/join/:id`.
 *
 * 이 라우트는 catch-all(`app.get("*")`)보다 먼저 등록되어 있어 noindex 정책의 **예외**입니다.
 * `seo.config.cjs`의 `/space` prefix는 이 핸들러를 우회하지 못합니다 (Express 매칭 순서).
 *
 * 동작:
 *   1. 암호화된 ID → AES 복호화 → space ID
 *   2. 백엔드에서 리더·팀 이름 fetch
 *   3. "{leader}님의 회고 초대장" 등 개인화된 OG 메타로 HTML 반환
 *
 * 이유: 카카오톡·X 등의 OG 봇이 이 URL을 직접 GET 했을 때 미리보기에
 *       정확한 초대 정보가 노출되어야 하기 때문.
 */
app.get("/space/join/:id", async (req, res) => {
  const encryptedId = req.params.id;
  let html;

  try {
    html = readIndexHtml();
  } catch (err) {
    console.error("Failed to read index.html:", err);
    return res.status(500).send("Error loading the page.");
  }

  try {
    const decryptedId = decryptId(encryptedId);
    const apiResponse = await axios.get(`${process.env.VITE_API_URL}/api/space/public/${decryptedId}`);
    const spaceData = apiResponse.data;

    const leaderName = spaceData?.leader?.name;
    const teamName = spaceData?.name;

    if (!leaderName || !teamName) {
      throw new Error("Missing leaderName or teamName from API response.");
    }

    const result = injectMeta(html, {
      title: `${leaderName}님의 회고 초대장`,
      description: `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`,
      image: INVITE_OG_IMAGE,
      url: getCanonicalUrl(req.path),
    });

    setCacheHeaders(res, "dynamic");
    res.send(result);
  } catch (err) {
    console.error("Error processing space join page:", err.message);
    // 복호화 실패·백엔드 4xx/5xx → 404 + noindex 메타 + SPA 셸 반환.
    // 봇은 "존재하지 않음"으로 인식해 재시도하지 않고,
    // 사용자는 SPA가 마운트되어 자체 에러 화면을 렌더할 수 있습니다.
    const fallback = injectMeta(html, {
      title: "초대장을 찾을 수 없습니다 | Layer",
      description: "이 회고 초대 링크는 만료되었거나 존재하지 않습니다.",
      image: DEFAULT_OG_IMAGE,
      url: getCanonicalUrl(req.path),
      noindex: true,
    });
    setCacheHeaders(res, "static-noindex");
    return res.status(404).send(fallback);
  }
});

/**
 * Catch-all 핸들러 — 정적 파일과 `/space/join/:id`를 제외한 모든 GET 요청.
 *
 * 의사결정:
 *   1. KNOWN_ROUTE_PATTERNS 매칭 실패 → 404 status + noindex (soft 404 방지)
 *   2. STATIC_ROUTE_META 정확 매칭 → 그 메타로 인덱싱
 *   3. NOINDEX_PATH_PREFIXES startsWith 매칭 → DEFAULT 메타 + noindex
 *   4. 그 외 known route → DEFAULT 메타로 인덱싱
 *
 * 메모리 캐시(`META_CACHE`)는 결정론적 경로(=정의된 라우트)에만 적용됩니다.
 */
app.get("*", (req, res) => {
  try {
    const knownRoute = isKnownRoute(req.path);
    const routeMeta = resolveRouteMeta(req.path);
    const isNoindex = !!routeMeta?.noindex || !knownRoute;
    const cacheKind = isNoindex ? "static-noindex" : "static-public";
    const cacheKey = knownRoute ? req.path : "__not_found__";

    // 캐시 히트 (정의된 라우트만)
    if (knownRoute && META_CACHE.has(cacheKey)) {
      setCacheHeaders(res, cacheKind);
      return res.send(META_CACHE.get(cacheKey));
    }

    const html = readIndexHtml();
    const canonicalUrl = getCanonicalUrl(req.path);

    let meta;
    if (!knownRoute) {
      meta = {
        title: "페이지를 찾을 수 없습니다 | Layer",
        description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
        image: DEFAULT_OG_IMAGE,
        url: canonicalUrl,
        noindex: true,
      };
    } else if (isNoindex) {
      meta = { ...DEFAULT_META, ...routeMeta, url: canonicalUrl, noindex: true };
    } else {
      meta = { ...DEFAULT_META, ...(routeMeta || {}), url: canonicalUrl };
    }

    const result = injectMeta(html, meta);

    if (knownRoute) {
      setMetaCache(cacheKey, result);
    }
    setCacheHeaders(res, cacheKind);
    // 미정의 경로는 명시적 404 status (SPA Error 컴포넌트가 본문 렌더)
    res.status(knownRoute ? 200 : 404).send(result);
  } catch (err) {
    console.error("Error serving page:", err);
    const filePath = path.join(distPath, "index.html");
    res.sendFile(filePath);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Vercel Serverless Function 진입점 호환을 위해 app export
module.exports = app;
