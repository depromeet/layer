import { css } from "@emotion/react";
import { Fragment } from "react";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

type HeaderProps = {
  theme?: ThemeSet;
  title: string;
  contents?: string;
};

type ThemeSet = "white" | "primary";

export function Header({ theme = "primary", title, contents }: HeaderProps) {
  const themeSet: Record<ThemeSet, { titleColor: keyof typeof DESIGN_SYSTEM_COLOR; contentsColor: keyof typeof DESIGN_SYSTEM_COLOR }> = {
    primary: {
      titleColor: "black",
      contentsColor: "grey500",
    },
    white: {
      titleColor: "white",
      contentsColor: "grey300",
    },
  };

  const parseTextToJSX = (text: string) => {
    const regex = /\{(.*?)\}|([^{}]+)/g;
    const matches = text.matchAll(regex);

    return Array.from(matches).map((match, index) => {
      if (match[1]) {
        return (
          <span key={index} className="text-h3">
            {match[1]}
          </span>
        );
      } else {
        return <span key={index}>{match[2]}</span>;
      }
    });
  };

  return (
    <Fragment>
      <header
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.2rem;
          margin-top: 2rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.4rem;
          `}
        >
          {title.split("\n").map((item) => (
            <div key={item}>
              {parseTextToJSX(item).map((title, index) => (
                <Typography key={index} variant={"T4"} color={themeSet[theme].titleColor}>
                  {title}
                </Typography>
              ))}
            </div>
          ))}
        </div>
        {contents &&
          contents.split("\n").map((item) => (
            <div key={item}>
              {parseTextToJSX(item).map((contents, index) => (
                <Typography key={index} variant={"B1"} color={themeSet[theme].contentsColor}>
                  {contents}
                </Typography>
              ))}
            </div>
          ))}
      </header>
    </Fragment>
  );
}
