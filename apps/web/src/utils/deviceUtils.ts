import { getDevice } from "kr-corekit";

interface DeviceReturnType {
  deviceType: "mobile" | "desktop";
  isDesktop: boolean;
  isMobile: boolean;
}

const getDeviceType = (threshold = 768): DeviceReturnType => {
  if (typeof window === "undefined") {
    // SSR 환경에서는 기본값 반환
    return { deviceType: "mobile", isDesktop: false, isMobile: true };
  }
  /**
   * @description window 객체가 존재하는 경우와 그렇지 않은 경우를 모두 처리
   * - window 객체가 존재하는 경우: 화면 너비를 기준으로 디바이스 타입 결정
   * - window 객체가 존재하지 않는 경우: kr-corekit의 getDevice(useragent) 함수 사용
   */
  const deviceType = (() => {
    if (window) {
      return window.innerWidth <= threshold ? "mobile" : "desktop";
    } else {
      const { isDesktop } = getDevice();
      return isDesktop ? "desktop" : "mobile";
    }
  })();
  const { pathname } = window.location;
  const isDesktop = deviceType === "desktop" && !pathname.startsWith("/m");
  const isMobile = deviceType === "mobile" || pathname.startsWith("/m");

  return { deviceType, isDesktop, isMobile };
};

/**
 * @description 현재 클라이언트의 디바이스 타입(mobile/desktop)을 감지하고 HTML 루트(<html>) 태그에 명시적으로 data-device 속성으로 기록해요.
 * @example
 * - <html data-device="mobile">
 * - <html data-device="desktop">
 */
const markDeviceTypeOnHtml = (): void => {
  const { isMobile } = getDeviceType();
  const html = document.documentElement;
  const deviceType = isMobile ? "mobile" : "desktop";
  html.setAttribute("data-device", deviceType);
};

export { getDeviceType, markDeviceTypeOnHtml };
