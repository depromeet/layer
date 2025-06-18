import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { GoogleLoginResponse } from "@/types/loginType";
import { PATHS } from "@layer/shared";

const getGoogleLoginResponse = async (code: string): Promise<GoogleLoginResponse> => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI as string;
  const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET as string;
  const data = {
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    client_secret: CLIENT_SECRET,
    code: code,
  };

  const response = await axios.post<GoogleLoginResponse>(`https://oauth2.googleapis.com/token`, new URLSearchParams(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const usePostGoogleToken = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getGoogleLoginResponse,
    onSuccess: (googleLoginResponse: GoogleLoginResponse) => {
      Cookies.set("googleAccessToken", googleLoginResponse.access_token);
    },
    onError: (error) => {
      console.log("Sign in failed:", error);
      navigate(PATHS.login());
    },
  });
};
