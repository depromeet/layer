import { WebViewLayout } from "@/layout/webview-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpaceCreatePage() {
  return (
    <WebViewLayout
      pathname="/space/create"
      style={{
        backgroundColor: "#212329",
      }}
    />
  );
}
