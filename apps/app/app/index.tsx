import { SafeAreaView } from "react-native-safe-area-context";
import { createWebView, postMessageSchema } from "@webview-bridge/react-native";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, Text, View } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { z } from "zod";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { shareFeedTemplate } from "@react-native-kakao/share";
import { appBridge } from "@/bridge/native";

const schema = postMessageSchema({
  getBackgroundColor: z.string(),
});

const { WebView } = createWebView({
  bridge: appBridge,
  debug: true,
  postMessageSchema: schema,
});

export interface BridgeEvent {
  body: Body;
  type: string;
  data?: string;
}

export interface Body {
  args: any[];
  eventId: string;
  method: string;
}

export default function LoginPage() {
  const [color, setColor] = useState("white");
  const [text, setText] = useState<string[]>(["FIRST"]);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: color }}>
      <WebView
        userAgent={customUserAgent}
        originWhitelist={["*"]}
        style={{
          flex: 1,
        }}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled
        allowsInlineMediaPlayback
        javaScriptEnabled
        domStorageEnabled
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        bounces={false}
        source={{
          uri: "https://stg.layerapp.io/",
        }}
        onMessage={(event) => {
          const data = event.nativeEvent.data;
          if (data) {
            setText((prev) => [...prev, data]);
            const param = JSON.parse(data) as BridgeEvent;

            if (param?.data) {
              setColor(param?.data);
            }
          }
        }}
      />
    </SafeAreaView>
  );
}
