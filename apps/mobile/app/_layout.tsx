import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreen } from "@/components/splash";
import { Stack } from "expo-router";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SuspenseProvider } from "@/provider/suspense-provider";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import * as Linking from "expo-linking";
import branch from "react-native-branch";
import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = false;
const useNative = false;
const mixpanel = new Mixpanel(
  process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
  trackAutomaticEvents,
  useNative
);

mixpanel.init();

interface BranchEventParams {
  $og_title: string;
  "+referrer": string;
  $marketing_title: string;
  "+referring_browser": string;
  "+is_first_session": boolean;
  /**
   *  utm_source
   */
  "~channel": string;
  "~referring_link": string;
  "+match_type": string;
  "~id": string;
  "+click_timestamp": number;
  "+match_guaranteed": boolean;
  "+clicked_branch_link": boolean;
  /**
   * utm_medium
   */
  "~feature": "natural";
  $deeplink_path: string;
  "~marketing": true;
  /**
   *  utm_campaign
   */
  "~campaign": "none";
}

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function checkInitialReferringParams() {
      const [f, l] = await Promise.all([
        branch.getFirstReferringParams(),
        branch.getLatestReferringParams(),
      ]);
      if (l) {
        mixpanel.track("Last Branch Event ", l);
      }
    }
    function subscribeBranch() {
      const unsubscribe = branch.subscribe({
        onOpenComplete(event) {
          if (event.params) {
            const params = event.params as unknown as BranchEventParams;
            const args = {
              utm_source: params["~channel"],
              utm_medium: params["~feature"],
              utm_campaign: params["~campaign"],
              ...params,
            };
            mixpanel.track("Referer Event ", args);
          }
        },
      });

      return unsubscribe;
    }

    checkInitialReferringParams();
    const unsubscribe = subscribeBranch();
    if (!!process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY) {
      initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY);
    }
    return () => {
      unsubscribe();
    };
  }, []);

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

  const url = Linking.useURL();
  if (url) {
    const { hostname, path, queryParams, scheme } = Linking.parse(url);
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SplashScreen isLoaded={true}>
          <SuspenseProvider>
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="login"
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SuspenseProvider>
        </SplashScreen>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
