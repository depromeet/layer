import { WebViewLayout } from "@/layout/webview-layout";
import { useSuspense } from "@/provider/suspense-provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpaceCreatePage() {
  const insets = useSafeAreaInsets();
  const { backgroundColor } = useSuspense();
  return (
    <WebViewLayout
      pathname="/space/create"
      style={{
        backgroundColor: backgroundColor ?? "#212329",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    />
  );
}
