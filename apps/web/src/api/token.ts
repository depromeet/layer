import axios from "axios";
import Cookies from "js-cookie";

import { AUTH_COOKIE_OPTIONS, COOKIE_KEYS } from "@/config/storage-keys";
import { AuthResponse } from "@/types/loginType";

const API_URL = import.meta.env.VITE_API_URL as string;

// 인터셉터가 없는 별도 인스턴스 (무한 루프 방지)
const refreshApi = axios.create({ baseURL: API_URL });

let refreshPromise: Promise<AuthResponse> | null = null;
let lastRefreshFailedAt = 0;
const REFRESH_COOLDOWN_MS = 2000;

// POST /api/auth/reissue-token
// Header: Refresh: {refreshToken}
// Body: { member_id: number }
// Response 201: AuthResponse (전체 사용자 정보 + 새 토큰)
export async function refreshAccessToken(): Promise<AuthResponse> {
  if (refreshPromise) return refreshPromise;

  if (Date.now() - lastRefreshFailedAt < REFRESH_COOLDOWN_MS) {
    throw new Error("Refresh recently failed, cooldown active");
  }

  refreshPromise = (async () => {
    try {
      const refreshToken = Cookies.get(COOKIE_KEYS.refreshToken);
      const memberId = Cookies.get(COOKIE_KEYS.memberId);
      if (!refreshToken || !memberId) throw new Error("No refresh token or memberId");

      const { data } = await refreshApi.post<NonNullable<AuthResponse>>(
        "/api/auth/reissue-token",
        { member_id: Number(memberId) },
        { headers: { Refresh: refreshToken } },
      );

      Cookies.set(COOKIE_KEYS.accessToken, data.accessToken, AUTH_COOKIE_OPTIONS);
      Cookies.set(COOKIE_KEYS.refreshToken, data.refreshToken, AUTH_COOKIE_OPTIONS);

      return data;
    } catch (e) {
      lastRefreshFailedAt = Date.now();
      throw e;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export function clearAuthCookies() {
  Cookies.remove(COOKIE_KEYS.accessToken);
  Cookies.remove(COOKIE_KEYS.refreshToken);
  Cookies.remove(COOKIE_KEYS.memberId);
}
