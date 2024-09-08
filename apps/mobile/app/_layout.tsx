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
import { useFonts } from "expo-font";

import { KAKAO_NATIVE_APP_KEY } from "@env";
import { SuspenseProvider } from "@/provider/suspense-provider";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!!KAKAO_NATIVE_APP_KEY) {
      initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
    }
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

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SplashScreen isLoaded={true}>
          <SuspenseProvider>
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="login"
            >
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SuspenseProvider>
        </SplashScreen>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
