import { ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ConfigContext["config"] => ({
  ...config,
  ios: {
    ...config.ios,
    config: {
      ...(config?.ios?.config ?? {}),
      usesNonExemptEncryption: false,
    },
  },
  plugins: [
    [
      "expo-font",
      {
        fonts: ["@/assets/fonts/Helvetica.ttf"],
      },
    ],
  ],
});
