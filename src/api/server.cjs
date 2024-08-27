const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// 프로젝트 루트 경로에서 dist 폴더 제공
const distPath = path.resolve(__dirname, "../../dist"); // 루트 디렉토리 기준으로 절대 경로 사용

app.use(express.static(distPath));

app.get("/space/join/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(distPath, "index.html"); // dist 경로에 있는 index.html 사용
  let html;

  try {
    html = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read index.html:", err);
    res.status(500).send("Error loading the page.");
    return;
  }

  // 동적 메타태그 설정 (정규 표현식 사용)
  html = html.replace(/<title>(.*?)<\/title>/, `<title>Join Space ${id} | MyApp</title>`);
  html = html.replace(
      /<meta\s+name="description"\s+content=".*?">/,
      `<meta name="description" content="Join space ${id} at MyApp!">`
  );
  // Open Graph 태그 동적 치환
  html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?">/,
      `<meta property="og:title" content="함께 회고해요! - ${id} | MyApp">`
  );
  html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?">/,
      `<meta property="og:description" content="Join space ${id} description">`
  );
  html = html.replace(
      /<meta\s+property="og:image"\s+content=".*?">/,
      `<meta property="og:image" content="https://example.com/space-${id}-image.jpg">`
  );

  res.send(html);
});

app.get("*", (req, res) => {
  const filePath = path.join(distPath, "index.html"); // dist 경로에 있는 index.html 사용
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});