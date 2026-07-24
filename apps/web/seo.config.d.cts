/**
 * Type declarations for `./seo.config.cjs`.
 *
 * `.cjs` 모듈을 .ts/.tsx에서 import할 때 TypeScript가 타입을 추론할 수 있도록 제공합니다.
 * 런타임 동작은 `seo.config.cjs`에 정의되어 있으며, 이 파일은 시그니처만 선언합니다.
 */

export declare const BASE_URL: string;
export declare const DEFAULT_OG_IMAGE: string;
export declare const INVITE_OG_IMAGE: string;

/** 공개 인덱싱 라우트 (sitemap dynamicRoutes). */
export declare const INDEXABLE_ROUTES: string[];

/** noindex 라우트 prefix (sitemap exclude + server noindex 공유). */
export declare const PRIVATE_ROUTE_PREFIXES: string[];

/** `PRIVATE_ROUTE_PREFIXES`의 별칭 (server.cjs용 startsWith 매칭). */
export declare const NOINDEX_PATH_PREFIXES: string[];

/** `PRIVATE_ROUTE_PREFIXES`를 vite-plugin-sitemap의 glob 형식으로 변환한 결과. */
export declare const SITEMAP_EXCLUDE: string[];

/** robots.txt의 Disallow 패턴 (PRIVATE_ROUTE_PREFIXES와 별도 관리). */
export declare const ROBOTS_DISALLOW_PREFIXES: string[];
