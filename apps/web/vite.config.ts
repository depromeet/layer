import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        presets: ["jotai/babel/preset"],
      },
    }),
    svgr(),
    Sitemap({
      hostname: "https://layerapp.io",
      dynamicRoutes: ["/login", "/m/template"],
      exclude: [
        "/desktop",
        "/desktop/**",
        "/staging",
        "/setnickname/**",
        "/myinfo",
        "/myinfo/**",
        "/write",
        "/write/**",
        "/retrospect",
        "/retrospect/**",
        "/space/create",
        "/space/create/**",
        "/goals",
        "/goals/**",
        "/api/**",
      ],
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
    }),
    VitePluginRadar({
      analytics: {
        id: process.env.VITE_GOOGLE_ANALYTICS,
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    outDir: "dist", // 빌드 결과가 저장되는 폴더
    sourcemap: true, // 디버깅을 위한 소스맵 생성 (선택 사항)
    // 현재 일부 서드파티 패키지의 sourcemap이 깨져 있어, 조치 불가능한 노이즈 경고를 필터링합니다.
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "SOURCEMAP_ERROR" && warning.message.includes("Can't resolve original location of error")) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-emotion": ["@emotion/react", "@emotion/styled"],
          "vendor-motion": ["framer-motion"],
          "vendor-dnd": ["@hello-pangea/dnd"],
          "vendor-swiper": ["swiper"],
          "vendor-lottie": ["lottie-react"],
        },
      },
    },
    // 현재 번들 크기는 의도적으로 큰 상태이므로, 경고 로그를 실질적으로 대응 가능한 수준으로 유지합니다.
    chunkSizeWarningLimit: 7000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
