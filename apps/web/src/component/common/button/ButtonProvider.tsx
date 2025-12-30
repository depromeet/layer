import { css, Interpolation, Theme } from "@emotion/react";
import { Children, cloneElement, isValidElement, PropsWithChildren } from "react";

import { Button, ButtonProps } from "@/component/common/button/Button.tsx";
import { getDeviceType } from "@/utils/deviceUtils";
import { useFunnelModal } from "@/hooks/useFunnelModal";

type SortSet = "vertical" | "horizontal";

type ButtonProviderProps = {
  sort?: SortSet;
  onlyContainerStyle?: Interpolation<Theme>;
  gradient?: boolean;
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

const White = ({ ...props }) => {
  return <Button colorSchema={"white"} {...props} />;
};

export const ButtonProvider = ({
  sort = "vertical",
  children,
  onlyContainerStyle,
  gradient = true,
  ...props
}: PropsWithChildren<ButtonProviderProps>) => {
  const { isDesktop } = getDeviceType();
  const { funnelModalState } = useFunnelModal();

  return (
    <div
      css={[
        css`
          display: flex;
          ${sort === "horizontal"
            ? css`
                align-items: center;
                column-gap: 0.8rem;
              `
            : css`
                flex-direction: column;
                row-gap: 1rem;
              `}
          position: sticky;
          bottom: 0;
          padding: ${isDesktop ? "0.8rem 0 1.6rem" : "4rem 0 2rem"};
          background-color: ${isDesktop && funnelModalState.step === "listTemplateDetail" ? "#fff" : "transparent"};
          margin-top: auto;
          z-index: 10000;
        `,
        onlyContainerStyle,
      ]}
    >
      {gradient && (
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: ${isDesktop ? "" : "0 -2rem"};
            z-index: -1;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--parent-bg-color) 57.38%);
          `}
        />
      )}
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
ButtonProvider.White = White;
