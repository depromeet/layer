import { css } from "@emotion/react";
import { Children, cloneElement, isValidElement, PropsWithChildren } from "react";

import { Button, ButtonProps } from "@/component/common/button/Button.tsx";

type SortSet = "vertical" | "horizontal";

type ButtonProviderProps = {
  sort?: SortSet;
} & ButtonProps;

const Primary = ({ ...props }) => {
  return <Button colorSchema={"primary"} {...props} />;
};

const Sky = ({ ...props }) => {
  return <Button colorSchema={"sky"} {...props} />;
};

const Gray = ({ ...props }) => {
  return <Button colorSchema={"gray"} {...props} />;
};

export const ButtonProvider = ({ sort = "vertical", children, ...props }: PropsWithChildren<ButtonProviderProps>) => {
  return (
    <div
      css={css`
        display: flex;
        ${sort === "horizontal"
          ? css`
              align-items: center;
              column-gap: 1.7rem;
            `
          : css`
              flex-direction: column;
              row-gap: 0.6rem;
            `}
        position: sticky;
        bottom: 0;

        padding: 4rem 0 2rem 0;
        margin-top: auto;
        z-index: 10001;
      `}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { ...props });
        }
      })}
    </div>
  );
};

ButtonProvider.Primary = Primary;
ButtonProvider.Gray = Gray;
ButtonProvider.Sky = Sky;
