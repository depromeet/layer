import { css } from "@emotion/react";
import { Children, cloneElement, isValidElement, PropsWithChildren } from "react";

import Button, { ButtonProps } from "@/component/Button/Button.tsx";

const Primary = ({ ...props }) => {
  return <Button colorSchema={"primary"} {...props} />;
};

const Sky = ({ ...props }) => {
  return <Button colorSchema={"sky"} {...props} />;
};

const Gray = ({ ...props }) => {
  return <Button colorSchema={"gray"} {...props} />;
};

export const ButtonProvider = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        position: sticky;
        bottom: 0;

        padding: 4rem 0 2rem 0;
        margin-top: auto;
        row-gap: 0.6rem;
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
