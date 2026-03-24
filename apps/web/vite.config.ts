import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";
import { VitePWA } from "vite-plugin-pwa";

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
    Sitemap({ hostname: "https://layerapp.io" }),
    VitePluginRadar({
      analytics: process.env.VITE_GOOGLE_ANALYTICS ? { id: process.env.VITE_GOOGLE_ANALYTICS } : undefined,
    }),
    VitePWA({
      registerType: "autoUpdate",
      // useRegisterSW 훅으로 직접 등록하므로 자동 주입 비활성화
      injectRegister: null,
      includeAssets: ["favicon.ico", "white_layer.svg", "apple-touch-icon-180x180.png", "robots.txt"],
      manifest: {
        name: "성장하는 당신을 위한 회고 서비스, Layer",
        short_name: "Layer",
        description: "편리한 회고 작성부터 AI 분석까지 Layer에서 함께해요!",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "ko",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // SPA 라우팅: 모든 navigate 요청을 index.html로 fallback
        navigateFallback: "index.html",
        // API 요청은 서비스 워커에서 제외 (인증 데이터 캐싱 방지)
        navigateFallbackDenylist: [/^\/api\//, /^\/oauth2\//, /^\/__/],
        // 프리캐시: Vite 빌드 결과물 자동 수집 (sourcemap 제외)
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        globIgnores: ["**/*.map"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          // * CDN 폰트: 1년 캐시
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-fonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // * NCloud 오브젝트 스토리지 이미지: 1년 캐시
          // * 회고 공유 사진 및 일러스트 이미지에 사용되고 있음
          {
            urlPattern: /^https:\/\/kr\.object\.ncloudstorage\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "ncloud-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // * API 요청: 네트워크 우선, 오프라인 시 캐시 (개인 데이터 제외)
          {
            urlPattern: /^https:\/\/.*\/api\/.*/i,
            handler: "NetworkOnly",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
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
