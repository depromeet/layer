import { css } from "@emotion/react";

import { HeaderProps, parseTextToJSX, ThemeSet } from "@/component/common/header/HeaderProvider.tsx";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

const themeSet: Record<ThemeSet, keyof typeof DESIGN_SYSTEM_COLOR> = {
  primary: "black",
  white: "white",
};
export function Title({ contents, type = "title", theme = "primary", ...props }: Pick<HeaderProps, "contents" | "theme" | "type">) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {typeof contents === "string" &&
        contents.split("\n").map((item) => (
          <div key={item}>
            {parseTextToJSX(item).map((title, index) => (
              <Typography key={index} variant={type === "modal" ? "title18Bold" : "heading24Bold"} color={themeSet[theme]} {...props}>
                {title}
              </Typography>
            ))}
          </div>
        ))}
    </div>
  );
}
