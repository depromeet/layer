export function PreventExternalBrowser() {
  const agent = navigator.userAgent;
  const URL = document.URL;
  alert("agent");

  // NOTE: 카카오톡 인앱 브라우저 방지
  if (agent.includes("KAKAO")) {
    window.open(`kakaotalk://web/openExternal?url=${encodeURIComponent(URL)}`);
  } else if (agent.includes("Instagram")) {
    /**
     * NOTE: 현재는 해당 인스타그램 인앱 탈출 코드가 작동하지 않는 것 같음
     * 추후 카카오톡처럼 인스타그램 인앱 방지 분석 후 코드 추가 예정
     */
  }

  return null;
}
