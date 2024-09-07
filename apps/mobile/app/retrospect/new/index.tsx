import { WebViewLayout } from "@/layout/webview-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RetrospectNewPage() {
  const insets = useSafeAreaInsets();

  return (
    <WebViewLayout
      pathname={`/retrospect/new`}
      style={{
        backgroundColor: "#212329",
        paddingTop: insets.top,
      }}
    />
  );
}
