import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "레이어 — 회고가 쌓이면, 우리의 다음이 달라져요.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(
    join(process.cwd(), "src/app/fonts/LayerOG.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f1f5fd",
          color: "#202c42",
          padding: "70px 85px",
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 50,
          }}
        >
          layer.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          <span>회고가 쌓이면,</span>
          <span style={{ color: "#376ce3" }}>우리의 다음이 달라져요.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 27,
            color: "#647086",
            marginTop: 35,
          }}
        >
          회고 템플릿 · AI 분석 · 실행 목표 관리
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: font, style: "normal", weight: 700 }],
    },
  );
}
