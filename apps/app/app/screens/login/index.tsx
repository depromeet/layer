import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createWebView, postMessageSchema } from "@webview-bridge/react-native";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { z } from "zod";
import { appBridge } from "@layer/shared";

const schema = postMessageSchema({
  getBackgroundColor: z.string(),
});

const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
  postMessageSchema: schema,
});

export interface BridgeEvent {
  body: Body;
  type: string;
}

export interface Body {
  args: any[];
  eventId: string;
  method: string;
}

export function LoginPage() {
  const insets = useSafeAreaInsets();

  const customUserAgent = "customUserAgent";
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "ios") {
      // iOS는 자동으로 권한을 요청하므로, 추가 설정이 필요 없습니다.
    } else {
      // 안드로이드의 경우 권한 요청이 필요합니다.
      const granted = await PermissionsAndroid.requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ]);

      if (
        granted["android.permission.CAMERA"] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Camera permission granted");
      } else {
        console.log("Camera permission denied");
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <WebView
        userAgent={customUserAgent}
        originWhitelist={["*"]}
        style={{
          flex: 1,
        }}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        bounces={false}
        source={{
          uri: "https://stg.layerapp.io/",
        }}
        onMessage={(event) => {
          const data = event.nativeEvent.data;
          if (data) {
            const param = JSON.parse(data) as BridgeEvent;
            console.log(param, "<<<data");
          }
        }}
      />
    </SafeAreaView>
  );
}
