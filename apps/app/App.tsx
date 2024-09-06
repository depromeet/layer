import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreen } from "@/components/splash";
import { PropsWithChildren } from "react";
import { StackNavigation } from "./app/stack/stack";

export default function App({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SplashScreen isLoaded={true}>
          <StackNavigation />
        </SplashScreen>
      </ThemeProvider>
    </NavigationContainer>
  );
}
