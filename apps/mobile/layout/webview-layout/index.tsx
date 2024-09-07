import { appBridge } from "@/bridge/native";
import { createWebView, postMessageSchema } from "@webview-bridge/react-native";
import { z } from "zod";
import { WEBVIEW_URI } from "@env";
import { StyleProp, ViewStyle } from "react-native";

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
  pathname: string;
  style?: StyleProp<ViewStyle>;
}

export const WebViewLayout = ({ pathname, style }: WebViewLayoutProps) => {
  const customUserAgent = "customUserAgent";
  const url = new URL(WEBVIEW_URI);
  url.pathname = pathname;

  return (
    <WebView
      userAgent={customUserAgent}
      originWhitelist={["*"]}
      style={[
        {
          flex: 1,
        },
      ]}
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
    />
  );
};
