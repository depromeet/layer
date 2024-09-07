import { WebViewLayout } from "@/layout/webview-layout";
import { useSuspense } from "@/provider/suspense-provider";
import { PATHS } from "@layer/shared";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpaceDetailPage() {
  const insets = useSafeAreaInsets();
  const { backgroundColor } = useSuspense();
  const local = useLocalSearchParams<{
    spaceId: Parameters<(typeof PATHS)["spaceDetail"]>[number];
  }>();
  return (
    <WebViewLayout
      pathname={`/space/${local.spaceId}`}
      style={{
        backgroundColor: "#212329",
        paddingTop: insets.top,
      }}
    />
  );
}
