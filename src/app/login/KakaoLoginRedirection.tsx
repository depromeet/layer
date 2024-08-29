import { useEffect, useState } from "react";

import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { usePostKakaoToken } from "@/hooks/api/login/usePostKakaoToken";
import { usePostSignIn } from "@/hooks/api/login/usePostSignIn";

export function KakaoLoginRedirection() {
  const code = new URL(window.location.toString()).searchParams.get("code");
  const [hasFetchedToken, setHasFetchedToken] = useState(false);

  const { mutate: fetchKakaoToken, data: kakaoLoginResponse, isSuccess: isKakaoSuccess } = usePostKakaoToken();
  const { mutate: postSignIn, isError: isLoginError } = usePostSignIn();

  useEffect(() => {
    if (code && !hasFetchedToken) {
      console.log("!");
      fetchKakaoToken(code);
      setHasFetchedToken(true);
    }
  }, [code, fetchKakaoToken, hasFetchedToken]);

  useEffect(() => {
    if (isKakaoSuccess && kakaoLoginResponse) {
      postSignIn({ socialType: "kakao" });
    }
  }, [isKakaoSuccess, kakaoLoginResponse, postSignIn]);

  if (isLoginError) {
    return <div>로그인 중 에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <LoadingModal />
    </div>
  );
}
