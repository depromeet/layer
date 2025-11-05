import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";

dotenv.config();

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
    Sitemap({ 
      hostname: "https://www.layerapp.io",
      changefreq: 'weekly',
      priority: 0.8,
      robots: [
        {
          userAgent: '*',
          allow: '/',
        }
      ],
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
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
