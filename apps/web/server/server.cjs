require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");
const CryptoJS = require("crypto-js");  // crypto-js를 추가합니다.

const app = express();

// 프로젝트 루트 경로에서 dist 폴더 제공
const distPath = path.resolve(__dirname, "../dist"); // 절대 경로 사용

app.use(express.static(distPath));

const CRYPTO_KEY = process.env.VITE_CRYPTO_KEY;
const VECTOR_KEY = process.env.VITE_VECTOR_KEY;

const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Utf8.parse(VECTOR_KEY);

// 복호화 함수 구현
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

const BASE_URL = "https://layerapp.io";
const DEFAULT_OG_IMAGE = "https://kr.object.ncloudstorage.com/layer-bucket/og-image.png";
const INVITE_OG_IMAGE = "https://kr.object.ncloudstorage.com/layer-bucket/retrospectOG.png";

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
 * key: req.path (Express에서 query string 제외된 경로)
 * 라우터 정의(`apps/web/src/router/index.tsx`)와 일치해야 함.
 */
const STATIC_ROUTE_META = {
  // ── 공개 페이지 (인덱싱 허용)
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

  // ── 인증 필요 / 개인 페이지 (noindex)
  "/myinfo": { noindex: true },
  "/write": { noindex: true },
  "/retrospect/new": { noindex: true },
  "/retrospect/recommend": { noindex: true },
  "/retrospect/analysis": { noindex: true },
  "/retrospect/complete": { noindex: true },
  "/space/create": { noindex: true },
  "/goals": { noindex: true },
  "/analysis": { noindex: true },
  "/staging": { noindex: true },
};

const NOINDEX_PATH_PREFIXES = [
  "/myinfo/",
  "/write/",
  "/retrospect/recommend/",
  "/space/edit/",
  "/space/create/",
  "/setnickname/",
  "/goals/",
  "/api/",
  "/desktop/myinfo",
  "/desktop/write",
  "/desktop/retrospect",
  "/desktop/space/create",
  "/desktop/space/edit/",
  "/desktop/setnickname/",
  "/desktop/goals",
  "/desktop/analysis",
];

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
    return res.status(500).send("Failed to fetch space data.");
  }
});

app.get("*", (req, res) => {
  try {
    const routeMeta = resolveRouteMeta(req.path);
    const isNoindex = !!routeMeta?.noindex;
    const cacheKind = isNoindex ? "static-noindex" : "static-public";

    // 캐시 히트
    if (META_CACHE.has(req.path)) {
      setCacheHeaders(res, cacheKind);
      return res.send(META_CACHE.get(req.path));
    }

    const html = readIndexHtml();
    const canonicalUrl = getCanonicalUrl(req.path);

    const meta = isNoindex
      ? { ...DEFAULT_META, ...routeMeta, url: canonicalUrl, noindex: true }
      : { ...DEFAULT_META, ...(routeMeta || {}), url: canonicalUrl };

    const result = injectMeta(html, meta);

    setMetaCache(req.path, result);
    setCacheHeaders(res, cacheKind);
    res.send(result);
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
