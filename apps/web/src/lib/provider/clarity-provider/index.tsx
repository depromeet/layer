import { createContext } from "@/lib/create-context";
import { PropsWithChildren } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider({ children }: PropsWithChildren) {
  if (import.meta.env.MODE === "production") {
    Clarity.init("vj5mt0s50u");
  }

  // TODO: 이벤트 분석 후에, 컨텍스트 API 이벤트 구체화
  const [Provider] = createContext("CLARITY_PROVIDER");
  return <Provider> {children} </Provider>;
}
