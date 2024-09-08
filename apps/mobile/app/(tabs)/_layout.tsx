import { Tabs } from "expo-router";
import { Text, View } from "react-native";

import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { forwardRef, useEffect } from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const Home = forwardRef(function HomeImpl(props: SvgProps, ref) {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      {...props}
    >
      <Path
        d="M9.16536 15.6312V22C9.16536 22.5523 8.71765 23 8.16536 23H4.03203C2.81701 23 1.83203 22.0633 1.83203 20.9078V8.84184C1.83203 8.39036 2.06183 7.96679 2.44873 7.70515L11.9821 1.2581C12.4909 0.913967 13.1731 0.913967 13.682 1.2581L23.2153 7.70515C23.6022 7.96679 23.832 8.39036 23.832 8.84184V20.9078C23.832 22.0633 22.8471 23 21.632 23H17.4987C16.9464 23 16.4987 22.5523 16.4987 22V15.6312C16.4987 14.8609 15.842 14.2364 15.032 14.2364H10.632C9.82201 14.2364 9.16536 14.8609 9.16536 15.6312Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.16536 15.6312V22C9.16536 22.5523 8.71765 23 8.16536 23H4.03203C2.81701 23 1.83203 22.0633 1.83203 20.9078V8.84184C1.83203 8.39036 2.06183 7.96679 2.44873 7.70515L11.9821 1.2581C12.4909 0.913967 13.1731 0.913967 13.682 1.2581L23.2153 7.70515C23.6022 7.96679 23.832 8.39036 23.832 8.84184V20.9078C23.832 22.0633 22.8471 23 21.632 23H17.4987C16.9464 23 16.4987 22.5523 16.4987 22V15.6312C16.4987 14.8609 15.842 14.2364 15.032 14.2364H10.632C9.82201 14.2364 9.16536 14.8609 9.16536 15.6312Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.16536 15.6312V22C9.16536 22.5523 8.71765 23 8.16536 23H4.03203C2.81701 23 1.83203 22.0633 1.83203 20.9078V8.84184C1.83203 8.39036 2.06183 7.96679 2.44873 7.70515L11.9821 1.2581C12.4909 0.913967 13.1731 0.913967 13.682 1.2581L23.2153 7.70515C23.6022 7.96679 23.832 8.39036 23.832 8.84184V20.9078C23.832 22.0633 22.8471 23 21.632 23H17.4987C16.9464 23 16.4987 22.5523 16.4987 22V15.6312C16.4987 14.8609 15.842 14.2364 15.032 14.2364H10.632C9.82201 14.2364 9.16536 14.8609 9.16536 15.6312Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.16536 15.6312V22C9.16536 22.5523 8.71765 23 8.16536 23H4.03203C2.81701 23 1.83203 22.0633 1.83203 20.9078V8.84184C1.83203 8.39036 2.06183 7.96679 2.44873 7.70515L11.9821 1.2581C12.4909 0.913967 13.1731 0.913967 13.682 1.2581L23.2153 7.70515C23.6022 7.96679 23.832 8.39036 23.832 8.84184V20.9078C23.832 22.0633 22.8471 23 21.632 23H17.4987C16.9464 23 16.4987 22.5523 16.4987 22V15.6312C16.4987 14.8609 15.842 14.2364 15.032 14.2364H10.632C9.82201 14.2364 9.16536 14.8609 9.16536 15.6312Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});

const Goal = forwardRef(function HomeImpl(props: SvgProps, ref) {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      {...props}
    >
      <Path
        d="M19.4234 1H5.57703C3.87771 1 2.50001 3.03332 2.5 4.55209V19.4479C2.49999 20.9667 3.87757 22.9999 5.5769 23L19.4231 23C21.1224 23 22.5 20.9667 22.5 19.4479V4.55209C22.5 3.03329 21.1228 1 19.4234 1Z"
        fill="currentColor"
      />
      <Path
        d="M8 8H17"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
      />
      <Path
        d="M8 12H17"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M8 16H12"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
});

const Analysis = forwardRef(function HomeImpl(props: SvgProps, ref) {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      {...props}
    >
      <Path
        d="M3.91406 23H20.4141C21.9328 23 23.1641 21.7688 23.1641 20.25V3.75C23.1641 2.23122 21.9328 1 20.4141 1H3.91406C2.39528 1 1.16406 2.23122 1.16406 3.75V20.25C1.16406 21.7688 2.39528 23 3.91406 23Z"
        fill="currentColor"
      />
      <Path
        d="M7.16406 17L7.16406 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12.1641 17L12.1641 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M17.1641 17L17.1641 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
});

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface AnimatedTabIconProps {
  focused: boolean;
  icon: React.FC<SvgProps>;
  label: string;
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  focused,
  icon: Icon,
  label,
}) => {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 300 });
  }, [focused]);

  const animatedProps = useAnimatedProps(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#CED2DA", "#212329"]
    );
    return {
      color: color,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#CED2DA", "#212329"]
    );
    return {
      color: color,
    };
  });

  return (
    <View style={{ alignItems: "center", rowGap: 4 }}>
      <AnimatedSvg width={20} height={20} animatedProps={animatedProps}>
        <Icon width={20} height={20} />
      </AnimatedSvg>
      <Animated.Text
        style={[
          {
            fontSize: 12,
            fontFamily: "pretendard",
          },
          animatedTextStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          paddingVertical: 10,
          height: 80,
        },
        tabBarShowLabel: false,
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused} icon={Home} label="회고" />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused} icon={Goal} label="실행 목표" />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused} icon={Analysis} label="분석" />
          ),
        }}
      />
    </Tabs>
  );
}
