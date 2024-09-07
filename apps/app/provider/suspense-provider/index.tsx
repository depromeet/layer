import { createContext } from "@layer/shared";
import { PropsWithChildren, useRef, useState } from "react";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { BlurView } from "@react-native-community/blur";

import loading from "@/assets/loading/loading.json";
import { listenSuspenseChange, SUSPENSE_STATE } from "@/bridge/native";

const [Provider, useSuspense] = createContext("SUSPENCE_PROVIDER");

const SuspenseProvider = ({ children }: PropsWithChildren) => {
  const [{ loading, message }, setSuspenseState] = useState<SUSPENSE_STATE>({
    loading: true,
    message: "",
  });

  useEffect(() => {
    listenSuspenseChange(setSuspenseState);
  }, []);
  return (
    <Provider>
      {children}
      {loading && <LoadingModal purpose={message} />}
    </Provider>
  );
};

const createAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number
): Animated.CompositeAnimation => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

const ANIMATION = {
  FADE_IN: (value: Animated.Value) => createAnimation(value, 1, 600),
  ZOOM_IN: (value: Animated.Value) =>
    Animated.spring(value, {
      toValue: 1,
      friction: 4,
      tension: 10,
      useNativeDriver: true,
    }),
};

type LoadingModalProps = {
  purpose?: string;
};

export function LoadingModal({
  purpose = "데이터를 가져오고 있어요",
}: LoadingModalProps): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      ANIMATION.FADE_IN(fadeAnim),
      ANIMATION.ZOOM_IN(scaleAnim),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.5)"
      />
      <Animated.View
        style={[styles.content, { transform: [{ scale: scaleAnim }] }]}
      >
        <LottieView source={loading} autoPlay loop style={styles.lottie} />
        <Text style={styles.purposeText}>{purpose}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    alignItems: "center",
    padding: 30,
    maxWidth: 300,
    borderRadius: 12,
  },
  lottie: {
    width: "40%",
    aspectRatio: 1,
  },
  purposeText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: -0.3,
    marginTop: 10,
  },
});

export { useSuspense, SuspenseProvider };
