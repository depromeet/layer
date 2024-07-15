import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

//FIXME: 응답 데이터 형식에 따라 수정
type KakaoLoginResponse = { data: string };

export const KaKaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    // FIXME: 백엔드 API에 따라 주소 수정 필요
    api
      .post(`kakaoLogin${code}`)
      .then((data: KakaoLoginResponse) => {
        // FIXME: 받은걸 어디에 저장할지 논의 필요 (로그인 저장 방식에 따라 달리짐)
        // => 로그인 성공 시 로직 추가
        // FIXME: 완료 후 이동 (프로세스에 따라 페이지 URL 변경)
        console.log(data);
        navigate("/test");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // FIXME: 로그인 로딩 디자인 필요 및 이에 따른 코드 추가 개발 필요
  return <div>로그인 중입니다.</div>;
};
