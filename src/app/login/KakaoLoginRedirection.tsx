import { useQuery } from "@tanstack/react-query";

import { signUpKakao } from "@/api/login";

export function KaKaoRedirection() {
  const code = new URL(window.location.toString()).searchParams.get("code");

  const { data } = useQuery({
    queryKey: ["auth", "kakao"],
    queryFn: () => signUpKakao(code),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchInterval: false,
  });

  console.log(data);

  // FIXME: 로그인 로딩 디자인 필요 및 이에 따른 코드 추가 개발 필요
  return <div>로그인 중입니다.</div>;
}
