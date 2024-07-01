import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KaKaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    // // FIXME: 백엔드 API에 따라 주소 수정 필요
    axios
      .post(`${import.meta.env.REACT_APP_URL}kakaoLogin${code}`)
      .then((r) => {
        console.log(r.data);
        // FIXME: 받은걸 어디에 저장할지 논의 필요 (로그인 저장 방식에 따라 달리짐)
        localStorage.setItem("name", r.data.user_name);
        // FIXME: 완료 후 이동
        navigate("/test");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // FIXME: 로그인 로딩 디자인 필요 및 이에 따른 코드 추가 개발 필요
  return <div>로그인 중입니다.</div>;
};

export default KaKaoRedirection;
