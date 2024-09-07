import { config } from "dotenv";
import { ConfigContext } from "@expo/config";

config();

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
          nativeAppKey: process.env.KAKAO_NATIVE_APP_KEY,
          android: {},
          ios: {},
        },
      ],
    ],
  };
};
