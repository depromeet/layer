import { css } from "@emotion/react";
import { Children, cloneElement, isValidElement, PropsWithChildren } from "react";

import Button, { ButtonProps } from "@/component/Button/Button.tsx";

const Primary = ({ ...props }) => {
  return <Button {...props} colorSchema={"primary"} />;
};

const Sky = ({ ...props }) => {
  return <Button {...props} colorSchema={"sky"} />;
};

const Gray = ({ ...props }) => {
  return <Button {...props} colorSchema={"gray"} />;
};

export const ButtonProvider = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <div
      css={css`
        position: sticky;
        bottom: 0;

        padding-bottom: 2rem;
        margin-top: auto;

        display: flex;
        flex-direction: column;
        row-gap: 0.6rem;
        flex: none;
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
