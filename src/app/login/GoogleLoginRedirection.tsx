import { useState, useEffect } from "react";

import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { usePostGoogleToken } from "@/hooks/api/login/usePostGoogleToken";
import { usePostSignIn } from "@/hooks/api/login/usePostSignIn";

export function GoogleLoginRedirection() {
  const code = new URL(window.location.toString()).searchParams.get("code");
  const [hasFetchedToken, setHasFetchedToken] = useState(false);

  const { mutate: fetchGoogleToken, data: googleLoginResponse, isSuccess: isGoogleSuccess } = usePostGoogleToken();
  const { mutate: postSignIn, isError: isLoginError } = usePostSignIn();

  useEffect(() => {
    if (code && !hasFetchedToken) {
      fetchGoogleToken(code);
      setHasFetchedToken(true);
    }
  }, [code, fetchGoogleToken, hasFetchedToken]);

  useEffect(() => {
    if (isGoogleSuccess && googleLoginResponse) {
      postSignIn({ socialType: "google" });
    }
  }, [isGoogleSuccess, googleLoginResponse, postSignIn]);

  if (isLoginError) {
    return <div>로그인 중 에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <LoadingModal />
    </div>
  );
}
