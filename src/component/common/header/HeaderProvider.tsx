import { css } from "@emotion/react";
import { Children, cloneElement, isValidElement, PropsWithChildren } from "react";

import { Explanation } from "@/component/common/header/Explanation.tsx";
import { Title } from "@/component/common/header/Title.tsx";
import { TypographyProps } from "@/component/common/typography/Typography.tsx";

export type ThemeSet = "white" | "primary";
export type HeaderProps = {
  theme?: ThemeSet;
  contents: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type"> &
  Omit<TypographyProps, "children">;
export const parseTextToJSX = (text: string) => {
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

const Subject = ({ theme, ...props }: HeaderProps) => {
  return <Title theme={theme} {...props} />;
};
const Description = ({ theme, ...props }: HeaderProps) => {
  return <Explanation theme={theme} {...props} />;
};
export function HeaderProvider({ children, ...props }: PropsWithChildren) {
  return (
    <header
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
      `}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { ...props });
        }
      })}
    </header>
  );
}

HeaderProvider.Subject = Subject;
HeaderProvider.Description = Description;
