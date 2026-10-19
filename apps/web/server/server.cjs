require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");
const CryptoJS = require("crypto-js"); // crypto-js를 추가합니다.

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

app.get("/space/join/:id", async (req, res) => {
  const encryptedId = req.params.id;
  const filePath = path.join(distPath, "index.html"); // dist 경로에 있는 index.html 사용
  let html;

  // 1. HTML 파일 읽기
  try {
    console.log(`Reading HTML file from ${filePath}`);
    html = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read index.html:", err);
    return res.status(500).send("Error loading the page.");
  }

  let leaderName, teamName;
  console.log("VITE_API_URL:", process.env.VITE_API_URL);
  console.log(`Decoded ID: ${encryptedId}`);

  try {
    const decryptedId = decryptId(encryptedId);
    const apiResponse = await axios.get(`${process.env.VITE_API_URL}/api/space/public/${decryptedId}`);
    const spaceData = apiResponse.data;
    console.log("Space Data:", spaceData);

    leaderName = spaceData?.leader?.name;
    teamName = spaceData?.name;

    if (!leaderName || !teamName) {
      throw new Error("Missing leaderName or teamName from API response.");
    }
  } catch (err) {
    console.error("Error fetching space data:", err.message);
    return res.status(500).send("Failed to fetch space data.");
  }

  try {
    const $ = cheerio.load(html);

    $("title").text(`${leaderName}님의 회고 초대장`);
    $('meta[name="description"]').attr("content", `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`);
    $('meta[property="og:title"]').attr("content", `${leaderName}님의 회고 초대장`);
    $('meta[property="og:description"]').attr("content", `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`);
    $('meta[property="og:image"]').attr("content", "https://kr.object.ncloudstorage.com/layer-bucket/retrospectOG.png");
    $('meta[name="twitter:title"]').attr("content", `${leaderName}님의 회고 초대장`);
    $('meta[name="twitter:description"]').attr("content", `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`);
    $('meta[name="twitter:image"]').attr("content", "https://kr.object.ncloudstorage.com/layer-bucket/retrospectOG.png");

    res.send($.html());
  } catch (err) {
    console.error("Error manipulating HTML:", err);
    return res.status(500).send("Error processing HTML.");
  }
});

const BASE_URL = "https://www.layerapp.io";

// 색인 허용 라우트
const PUBLIC_ROUTES = ["/", "/login"];

// 존재하지만 색인하지 않는 라우트 prefix. src/router/index.tsx에 최상위 경로를 추가하면 여기도 추가해야 404가 되지 않는다.
const NOINDEX_ROUTE_PREFIXES = [
  "/desktop",
  "/myinfo",
  "/space",
  "/retrospect",
  "/write",
  "/goals",
  "/analysis",
  "/setnickname",
  "/template",
  "/staging",
  "/api/auth/oauth2",
];

function resolveRoutePolicy(pathname) {
  const routePath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (PUBLIC_ROUTES.includes(routePath)) {
    return { status: 200, noindex: false, canonical: `${BASE_URL}${routePath}` };
  }
  if (NOINDEX_ROUTE_PREFIXES.some((prefix) => routePath === prefix || routePath.startsWith(`${prefix}/`))) {
    return { status: 200, noindex: true };
  }
  return { status: 404, noindex: true };
}

app.get("*", (req, res) => {
  let html;
  try {
    html = fs.readFileSync(path.join(distPath, "index.html"), "utf8");
  } catch (err) {
    console.error("Failed to read index.html:", err);
    return res.status(500).send("Error loading the page.");
  }

  const { status, noindex, canonical } = resolveRoutePolicy(req.path);
  const $ = cheerio.load(html);

  if (noindex) {
    $('meta[name="robots"]').attr("content", "noindex, nofollow");
    $('link[rel="canonical"]').remove();
  } else {
    $('link[rel="canonical"]').attr("href", canonical);
    $('meta[property="og:url"]').attr("content", canonical);
  }

  res.set("Cache-Control", "public, max-age=0, s-maxage=60");
  res.status(status).send($.html());
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
