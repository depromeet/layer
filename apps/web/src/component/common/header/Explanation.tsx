import { css } from "@emotion/react";

import { HeaderProps, parseTextToJSX, ThemeSet } from "@/component/common/header/HeaderProvider.tsx";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const themeSet: Record<ThemeSet, keyof typeof DESIGN_TOKEN_COLOR> = {
  primary: "gray600",
  white: "gray300",
};
export function Explanation({ contents, theme = "primary", ...props }: Pick<HeaderProps, "contents" | "theme">) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.4rem;
      `}
    >
      {typeof contents === "string" &&
        contents.split("\n").map((item) => (
          <div key={item}>
            {parseTextToJSX(item).map((contents, index) => (
              <Typography key={index} variant={"body16Medium"} color={themeSet[theme]} {...props}>
                {contents}
              </Typography>
            ))}
          </div>
        ))}
    </div>
  );
}
