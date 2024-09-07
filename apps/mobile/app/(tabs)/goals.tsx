import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebViewLayout } from "@/layout/webview-layout";

export default function LoginPage() {
  const insets = useSafeAreaInsets();
  return (
    <WebViewLayout
      pathname="/goals"
      style={{
        paddingTop: insets.top,
      }}
    />
  );
}
