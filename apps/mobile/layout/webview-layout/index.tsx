import { appBridge } from "@/bridge/native";
import { createWebView, postMessageSchema } from "@webview-bridge/react-native";
import { z } from "zod";
import { WEBVIEW_URI } from "@env";
import { StyleProp, View, ViewStyle } from "react-native";
import { Path } from "@layer/shared";
import { useState } from "react";
import { LoadingModal } from "@/provider/suspense-provider";
import { StatusBar } from "expo-status-bar";

const schema = postMessageSchema({
  getBackgroundColor: z.string(),
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

const { WebView } = createWebView({
  bridge: appBridge,
  debug: true,
  postMessageSchema: schema,
});

interface WebViewLayoutProps {
  pathname: Path;
  style?: StyleProp<ViewStyle>;
}

export const WebViewLayout = ({ pathname, style }: WebViewLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const handleEndLoad = () => {
    setIsLoaded(false);
  };
  const customUserAgent = "customUserAgent";
  const url = new URL(WEBVIEW_URI);
  url.pathname = pathname;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        cacheEnabled={false}
        userAgent={customUserAgent}
        originWhitelist={["*"]}
        style={[
          {
            flex: 1,
          },
        ]}
        onLoad={handleEndLoad}
        containerStyle={[style]}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled
        allowsInlineMediaPlayback
        javaScriptEnabled
        domStorageEnabled
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        bounces={false}
        source={{
          uri: url.toString(),
        }}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
      />
      {isLoaded && <LoadingModal purpose="데이터를 가져오고 있어요." />}
      <StatusBar style="light" backgroundColor="transparent" />
    </View>
  );
};
