import { ConfigContext } from "expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default ({ config }: ConfigContext): ConfigContext["config"] => {
  return {
    ...config,
    ios: {
      ...config.ios,
      config: {
        ...(config?.ios?.config ?? {}),
        usesNonExemptEncryption: false,
        branch: {
          apiKey: `key_live_${process.env.BRANCH_KEY}`,
        },
      },
      associatedDomains: [
        "applinks:app.layerapp.io",
        "applinks:layer-five.vercel.app",
        "applinks:1xdd5-alternate.app.link",
      ],
    },
    android: {
      config: {
        branch: {
          apiKey: `key_live_${process.env.BRANCH_KEY}`,
        },
      },
    },
    plugins: [
      "expo-router",
      "expo-asset",
      ["@config-plugins/react-native-branch"],

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
