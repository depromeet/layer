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
  const [loaded, error] = useFonts({
    helvetica: require("@/assets/fonts/Helvetica.ttf"),
    helveticaUltra: require("@/assets/fonts/Helvetica-Ultra.ttf"),
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SplashScreen isLoaded={loaded}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SplashScreen>
    </ThemeProvider>
  );
}
