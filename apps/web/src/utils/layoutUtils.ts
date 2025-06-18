export default {
  isMobileUserAgent(userAgent: string): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  },
  isMobileViewport(): boolean {
    if (typeof window === "undefined") return false; // SSR에서는 false
    return window.innerWidth <= 768; // 기준은 자유롭게 조정 가능
  },
  getDeviceType(userAgent?: string): "mobile" | "desktop" {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? "mobile" : "desktop";
    }

    if (userAgent) {
      return this.isMobileUserAgent(userAgent) ? "mobile" : "desktop";
    }

    return "desktop";
  },
};
