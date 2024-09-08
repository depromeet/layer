import { WebViewLayout } from "@/layout/webview-layout";
import { Path, PATHS } from "@layer/shared";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SocialTypePage() {
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams<{
    socialType: Parameters<(typeof PATHS)["setNickName"]>[number];
  }>();

  return (
    <WebViewLayout
      pathname={`/setnickname/${local.socialType}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "white",
      }}
    />
  );
}
