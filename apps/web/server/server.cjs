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

/**
 * Injects SEO meta tags into HTML using Cheerio.
 * Adds data-rh="true" for react-helmet-async compatibility.
 */
function injectMeta(html, { title, description, image, url }) {
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

  // Dynamic canonical URL injection
  $('head').append(`<link rel="canonical" href="${url}" data-rh="true" />`);

  return $.html();
}

const BASE_URL = "https://layerapp.io";

const STATIC_ROUTE_META = {
  "/": {
    title: "성장하는 당신을 위한 회고 서비스, Layer",
    description: "편리한 회고 작성부터 AI 분석까지 Layer에서 함께해요!",
  },
  "/login": {
    title: "로그인 | Layer",
    description: "카카오, 구글 계정으로 간편하게 Layer에 로그인하세요.",
  },
  "/m/template": {
    title: "회고 템플릿 모음 | Layer",
    description: "KPT, 5F, Mad Sad Glad 등 다양한 회고 양식을 제공합니다.",
  },
};

const DEFAULT_META = {
  title: "성장하는 당신을 위한 회고 서비스, Layer",
  description: "편리한 회고 작성부터 AI 분석까지 Layer에서 함께해요!",
};

function readIndexHtml() {
  const filePath = path.join(distPath, "index.html");
  return fs.readFileSync(filePath, "utf8");
}

function getCanonicalUrl(reqPath) {
  const canonicalPath = reqPath.replace(/^\/desktop/, '') || '/';
  return `${BASE_URL}${canonicalPath}`;
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
      image: "https://kr.object.ncloudstorage.com/layer-bucket/retrospectOG.png",
      url: getCanonicalUrl(req.path),
    });

    res.send(result);
  } catch (err) {
    console.error("Error processing space join page:", err.message);
    return res.status(500).send("Failed to fetch space data.");
  }
});

app.get("*", (req, res) => {
  try {
    const html = readIndexHtml();
    const canonicalUrl = getCanonicalUrl(req.path);
    const routeMeta = STATIC_ROUTE_META[req.path] || DEFAULT_META;

    const result = injectMeta(html, {
      ...routeMeta,
      url: canonicalUrl,
    });

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
