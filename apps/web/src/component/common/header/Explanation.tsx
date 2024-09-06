import { css } from "@emotion/react";

import { HeaderProps, parseTextToJSX, ThemeSet } from "@/component/common/header/HeaderProvider.tsx";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

const themeSet: Record<ThemeSet, keyof typeof DESIGN_SYSTEM_COLOR> = {
  primary: "grey500",
  white: "grey300",
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
      {contents.split("\n").map((item) => (
        <div key={item}>
          {parseTextToJSX(item).map((contents, index) => (
            <Typography key={index} variant={"body15Medium"} color={themeSet[theme]} {...props}>
              {contents}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}
