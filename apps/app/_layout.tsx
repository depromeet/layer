import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreen } from "@/components/splash";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SplashScreen isLoaded={true}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SplashScreen>
    </ThemeProvider>
  );
}
