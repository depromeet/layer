import { WebViewLayout } from "@/layout/webview-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  return (
    <WebViewLayout
      pathname="/login"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "white",
      }}
    />
  );
}
