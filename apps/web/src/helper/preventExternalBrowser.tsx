import { Fragment, PropsWithChildren } from "react";

export function PreventExternalBrowser({ children }: PropsWithChildren) {
  const agent = navigator.userAgent;
  const URL = document.URL;
  const isKakao = agent.includes("KAKAO");
  const isInstagram = agent.includes("Instagram");

  if (isKakao) {
    window.open(`kakaotalk://web/openExternal?url=${encodeURIComponent(URL)}`);
    return <span> 시스템 브라우저를 이용해주세요 </span>;
  } else if (isInstagram) {
    /**
     * NOTE: 현재는 해당 인스타그램 인앱 탈출 코드가 작동하지 않는 것 같음
     * 추후 카카오톡처럼 인스타그램 인앱 방지 분석 후 코드 추가 예정
     */
  }
  return <Fragment> {children} </Fragment>;
}
