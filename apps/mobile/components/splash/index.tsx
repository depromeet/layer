import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Logo, Text } from "./logo";
import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import * as NativeSplash from "expo-splash-screen";
NativeSplash.preventAutoHideAsync();

const AnimatedLogo = Animated.createAnimatedComponent(Logo);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

export const SplashScreen = ({
  onAnimationComplete,
  isLoaded,
  children,
}: PropsWithChildren<{
  isLoaded?: boolean;
  onAnimationComplete?: () => void;
}>) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { width, height } = useWindowDimensions();
  const logoPosition = useSharedValue(Dimensions.get("screen").width * 0.262);
  const logoScale = useSharedValue(0.3);
  const textOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);
  const mainScreenOpacity = useSharedValue(0);

  const logoSize = Math.min(width * 0.15, height * 0.15);
  const textHeight = logoSize * 1.4;

  const finalLogoPosition = -width * 0.15;

  const onFinish = useCallback(() => {
    screenOpacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(setIsAnimationComplete)(true);
    });
    mainScreenOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.cubic),
      })
    );
  }, [screenOpacity]);

  const animateLogo = useCallback(() => {
    logoPosition.value = withSequence(
      withTiming(Dimensions.get("screen").width * 0.262, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      }),
      withDelay(
        300,
        withTiming(
          0,
          {
            duration: 800,
            easing: Easing.inOut(Easing.cubic),
          },
          async () => {}
        )
      )
    );
    logoScale.value = withSequence(
      withTiming(2, { duration: 700, easing: Easing.out(Easing.circle) }),
      withDelay(
        300,
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.cubic) })
      ),
      withDelay(
        500,
        withTiming(1, { duration: 1 }, () => {
          runOnJS(onFinish)();
          if (onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        })
      )
    );
    textOpacity.value = withDelay(1300, withTiming(1, { duration: 500 }));
  }, [logoPosition, logoScale, textOpacity, finalLogoPosition]);

  useEffect(() => {
    if (isLoaded) {
      NativeSplash.hideAsync().then(() => {
        animateLogo();
      });
    }

    setTimeout(() => {}, 2300);
  }, [isLoaded, animateLogo, onAnimationComplete]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: logoPosition.value,
      },
      { scale: logoScale.value },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <View style={[styles.container]}>
      <AnimatedView style={[styles.container, { opacity: mainScreenOpacity }]}>
        {children}
      </AnimatedView>
      {!isAnimationComplete && (
        <AnimatedView
          exiting={FadeIn.duration(500)}
          style={[
            {
              position: "absolute",
              flex: 1,
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            },
            styles.container,
          ]}
        >
          <AnimatedView style={[styles.content, screenStyle]}>
            <AnimatedLogo
              width={logoSize}
              height={logoSize}
              color1="#172031"
              color2="#6C9CFA"
              style={[
                {
                  position: "relative",
                  opacity: 1,
                  transform: [
                    {
                      translateY: Dimensions.get("screen").height * 0.5,
                    },
                  ],
                },
                logoStyle,
                screenStyle,
              ]}
            />
            <View>
              <AnimatedText
                style={[
                  {
                    marginLeft: 20,
                    opacity: 0,
                    height: textHeight,
                  },
                  textStyle,
                ]}
              />
            </View>
          </AnimatedView>
        </AnimatedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
  },
});

export default SplashScreen;
