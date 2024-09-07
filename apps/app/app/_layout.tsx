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

import { KAKAO_NATIVE_APP_KEY } from "@env";
import { SuspenseProvider } from "@/provider/suspense-provider";
export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!!KAKAO_NATIVE_APP_KEY) {
      initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SplashScreen isLoaded={true}>
          <SuspenseProvider>
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="index"
            >
              <Stack.Screen name="index" />
            </Stack>
          </SuspenseProvider>
        </SplashScreen>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
