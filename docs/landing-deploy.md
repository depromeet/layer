# Landing 배포 가이드

`apps/landing` (Next.js) 은 GitHub Actions + Vercel CLI 로 배포합니다.
Vercel 의 GitHub 앱을 조직에 설치하지 않아도 되고, Hobby 플랜의 조직 private 레포 제한을 피할 수 있습니다.

## 배포 규칙
| 이벤트 | 결과 |
|---|---|
| `main` push (landing 관련 경로 변경) | Production 배포 |
| PR (`main`, `develop` 대상) | Preview 배포 + PR 코멘트로 URL 안내 |

## 최초 1회 설정 (레포 관리자)
1. Vercel 에서 `layer-landing` 프로젝트 생성 (Git 연결 없이). Framework: Next.js
2. Project Settings > General > **Root Directory** = `apps/landing`
   ("Include source files outside of the Root Directory" 켜 둠)
3. 레포 루트에서 `vercel link` 후 `.vercel/project.json` 의 `orgId`, `projectId` 확인 (이 폴더는 커밋하지 않음)
4. GitHub Secrets 등록
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_LANDING_PROJECT_ID`
5. Vercel 환경변수 등록
   - Production 에만: `SITE_URL` = `https://welcome.layerapp.io` (빌드 시점에 읽음. 이 값이 있어야 index 허용, robots/sitemap/canonical 이 켜짐)
   - `LAYER_APP_URL` = `https://www.layerapp.io` (기본값이라 생략 가능)
   - Preview/Development: `SITE_URL` 을 **설정하지 않음** (미설정이면 noindex + robots 전체 차단 + 빈 sitemap)

## 도메인 연결 (Cloudflare)
1. Vercel > Project > Settings > Domains 에 `welcome.layerapp.io` 추가
2. Cloudflare DNS 에 `CNAME  welcome  cname.vercel-dns.com` 추가
   - 처음에는 Proxy 끔(DNS only, 회색 구름) 권장. 프록시를 켜려면 SSL/TLS 모드를 Full (strict) 로
3. Vercel 에서 Valid Configuration 확인

## 주의
- Preview 배포가 색인되지 않도록 `SITE_URL` 은 Production 환경에만 등록하세요. 코드(`src/lib/site.ts`)가 이 값으로 index 여부를 결정합니다.
- Hobby 플랜은 개인·비상업 용도 제한과 하루 100회 배포 제한이 있습니다. 서비스 수익화 시 Pro 전환을 검토하세요.

## 배포 후 SEO 체크
- `https://welcome.layerapp.io/robots.txt` 에 `Allow: /` 와 Sitemap 줄이 있는지
- `/sitemap.xml` 에 홈 + 템플릿 5개 URL 이 있는지
- 페이지 소스에 `noindex` 가 없고 canonical 이 `https://welcome.layerapp.io/...` 인지
- Google Search Console(도메인 또는 URL 접두어 속성)과 Naver Search Advisor 에 등록하고 sitemap 제출
- Rich Results Test 로 FAQPage 확인
