import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        presets: ["jotai/babel/preset"],
      },
    }),
    svgr(),
    Sitemap({ hostname: "https://layerapp.io" }),
  ],
  build: {
    outDir: "dist", // 빌드 결과가 저장되는 폴더
    sourcemap: true, // 디버깅을 위한 소스맵 생성 (선택 사항)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
