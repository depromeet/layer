import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";

// 기존 사용자의 저장 상태를 유지하기 위해 키 값은 변경하지 않는다.
const FIRST_TIME_USER_STORAGE_KEY = "layer_home_onboarding_closed";

/**
 * 첫 사용자 졸업(온보딩 닫음) 기록 불러오기
 *
 * @returns Record<string, boolean>
 */
const getDismissedRecord = (): Record<string, boolean> => {
  const stored = localStorage.getItem(FIRST_TIME_USER_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

/**
 * 특정 사용자가 이미 첫 사용자 단계를 지났는지 확인
 *
 * @param memberId
 * @returns boolean
 */
const hasUserDismissed = (memberId: string): boolean => {
  const record = getDismissedRecord();
  return record[memberId] === true;
};

/**
 * 특정 사용자를 첫 사용자 단계 졸업으로 기록
 *
 * @param memberId
 */
const saveUserDismissed = (memberId: string): void => {
  const record = getDismissedRecord();
  record[memberId] = true;
  localStorage.setItem(FIRST_TIME_USER_STORAGE_KEY, JSON.stringify(record));
};

/**
 * 첫 사용자 여부 상태
 *
 * 아직 온보딩을 닫지 않은 사용자를 첫 사용자로 본다(`isFirstTimeUser` true).
 * 이 기준은 온보딩 노출뿐 아니라, 첫 사용자에게 가려야 하는 다른 영역의
 * 표시 여부를 함께 제어하는 데 사용된다.
 */
export function useFirstTimeUser() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const memberId = Cookies.get(COOKIE_KEYS.memberId);

  const dismiss = () => {
    if (!memberId) return;

    saveUserDismissed(memberId);
    setIsFirstTimeUser(false);
  };

  useEffect(() => {
    if (!memberId) {
      setIsFirstTimeUser(false);
      return;
    }

    setIsFirstTimeUser(!hasUserDismissed(memberId));
  }, [memberId]);

  return { isFirstTimeUser, dismiss };
}
