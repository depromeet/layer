require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

// 프로젝트 루트 경로에서 dist 폴더 제공
const distPath = path.resolve(__dirname, "../dist"); // 절대 경로 사용

app.use(express.static(distPath));

app.get("/space/join/:id", async (req, res) => {
  const id = req.params.id;
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
  console.log(`Decoded ID: ${atob(id)}`);

  try {
    const apiResponse = await axios.get(`${process.env.VITE_API_URL}/api/space/public/${atob(id)}`);
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

    $('title').text(`${leaderName}님의 회고 초대장`);
    $('meta[name="description"]').attr('content', `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`);
    $('meta[property="og:title"]').attr('content', `${leaderName}님의 회고 초대장`);
    $('meta[property="og:description"]').attr('content', `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`);
    $('meta[property="og:image"]').attr('content', '../src/assets/imgs/og/retrospectOG.png');

    res.send($.html());
  } catch (err) {
    console.error("Error manipulating HTML:", err);
    return res.status(500).send("Error processing HTML.");
  }
});

app.get("*", (req, res) => {
  const filePath = path.join(distPath, "index.html");
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});