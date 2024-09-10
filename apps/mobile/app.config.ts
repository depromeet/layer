import { ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ConfigContext["config"] => {
  return {
    ...config,
    ios: {
      ...config.ios,
      config: {
        ...(config?.ios?.config ?? {}),
        usesNonExemptEncryption: false,
      },
    },
    plugins: [
      "expo-router",
      "expo-asset",
      [
        "expo-font",
        {
          fonts: ["./assets/fonts/PretendardVariable.ttf"],
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: [
              "https://devrepo.kakao.com/nexus/content/groups/public/",
            ],
          },
        },
      ],
      [
        "@react-native-kakao/core",
        {
          nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
          android: {},
          ios: {},
        },
      ],
    ],
  };
};
