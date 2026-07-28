// Vite 8의 CJS/ESM interop 처리 방식에 따라 UMD 패키지의 default export가 한 겹 더 감싸질 수 있어
// (버전에 따라 달라질 수 있음), 함수/클래스를 찾을 때까지 default를 풀어준다.
export function resolveDefaultExport<T>(module: unknown): T {
  let resolved = module;
  while (resolved && typeof resolved !== "function" && "default" in (resolved as object)) {
    resolved = (resolved as { default: unknown }).default;
  }
  if (typeof resolved !== "function") {
    throw new Error("모듈에서 default export(함수/컴포넌트)를 찾지 못했습니다.");
  }
  return resolved as T;
}
