# 레이어 서비스 소개 사이트

한국어 공개 소개 페이지와 회고 템플릿 가이드용 Next.js App Router 앱입니다. 기존 Vite 서비스와 별도로 실행합니다.

## 실행과 검증

저장소 루트에서 Node.js 20.9 이상과 pnpm 9를 사용합니다.

```sh
pnpm install
pnpm -F @layer/landing dev
pnpm -F @layer/landing build
pnpm -F @layer/landing typecheck
pnpm -F @layer/landing lint
```

개발 및 프로덕션 서버 포트는 3001입니다. 프로덕션 서버는 빌드 후 `pnpm -F @layer/landing start`로 실행합니다.

## 페이지

- `/`: 서비스 소개, 템플릿 비교, 사용 방법, 자주 묻는 질문
- `/templates/kpt`, `/templates/5f`, `/templates/mad-sad-glad`, `/templates/ssc`, `/templates/pmi`: 회고 방법, 질문, 작성 예시
- `/robots.txt`, `/sitemap.xml`: 검색 수집 설정
- `/opengraph-image`: 한국어 공유 이미지

메인과 템플릿 가이드는 빌드 시 HTML로 생성됩니다. 템플릿 선택 부분만 클라이언트 컴포넌트이며, 모든 가이드는 일반 링크로도 연결됩니다. 화면의 팀 데이터와 분석 결과는 실제 고객 데이터가 아닌 예시입니다.

## 배포 설정

`.env.example`을 참고하여 **빌드 전에** 환경 변수를 설정합니다.

- `SITE_URL`: 소개 사이트의 최종 HTTPS origin. 경로 없이 지정합니다. 미설정 상태에서는 로컬 주소를 사용하며 `noindex`, `robots.txt`의 전체 차단, 빈 사이트맵을 출력합니다.
- `LAYER_APP_URL`: 시작 버튼이 이동할 기존 Layer 서비스 URL. 기본값은 `https://www.layerapp.io`입니다.

소개 사이트는 별도의 배포 프로젝트에서 `apps/landing`을 앱 루트로 사용하세요. 기존 `apps/web/vercel.json`은 이 앱에 적용하지 않습니다. 실제 도메인을 연결한 후 `SITE_URL`로 다시 빌드하고 canonical, robots, 사이트맵을 확인하세요. 검색 도구에 제출할 대상은 이 배포의 `/sitemap.xml`입니다.

기존 서비스의 루트 URL에는 로그인, OAuth, 초대 링크, 모바일 WebView, PWA 연결이 있습니다. 이 앱은 해당 경로를 이동하거나 기존 서비스 워커를 변경하지 않습니다. 대표 도메인을 소개 사이트로 전환하려면 별도로 기존 앱 주소·OAuth·WebView·PWA 이전 계획을 확정해야 합니다.

배포는 GitHub Actions + Vercel CLI로 진행합니다. 설정 방법은 `docs/landing-deploy.md`, 워크플로는 `.github/workflows/deploy-landing.yml`을 참고하세요. 운영 주소는 `https://welcome.layerapp.io`입니다.

## 자산과 내용

로고와 Pretendard 폰트는 기존 Layer 자산을 재사용합니다. 사용자에게 보이는 문구는 한국어이며 브랜드명과 회고 방식의 고유명칭은 유지합니다. 템플릿 설명과 질문은 `src/lib/templates.ts`, 서비스 주소와 SEO 기본값은 `src/lib/site.ts`에 있습니다.

## 디자인 기준

`src/app/design-tokens.css`는 기존 `apps/web/src/style/designTokens.ts`의 색상과 타이포그래피를 landing의 CSS 변수로 대응합니다. Web의 rem 기준은 10px, landing은 브라우저 기본 16px이므로 동일한 시각 크기로 환산합니다. 현재는 독립 앱 간 런타임 결합을 피하기 위한 명시적 대응이며, 원본 토큰 변경 시 함께 갱신해야 합니다.

- 제목: 28px / 모바일 24px, 소제목: 24px / 모바일 20px
- 본문: 14~16px, 보조 문구: 12px
- 첫 화면의 대표 문구만 landing 전용 40px / 모바일 32px 사용
- 브랜드 장식은 blue600, 흰 글자의 버튼 및 링크는 대비를 위해 blue700 사용
- 버튼 높이 48px, 작은 버튼 최소 44px, 모서리 12px
- SEED 소개 페이지의 절제된 구성과 중립 배경을 참고하되 Layer의 색상과 Pretendard 유지

여러 앱의 토큰을 함께 변경할 때 공유 패키지로 분리하는 것을 검토합니다. landing만을 위해 인증 앱의 UI 컴포넌트나 Emotion 의존성을 가져오지는 않습니다.
