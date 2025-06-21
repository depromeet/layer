import { css } from "@emotion/react";

import { Button, ButtonProvider } from "@/component/common/button";

interface DefaultModalFooterProps {
  leftText?: string;
  rightText?: string;
  leftFunction?: () => void;
  rightFunction: () => void;
}

export default function DefaultModalFooter({
  leftText = "취소",
  rightText = "확인",
  leftFunction,
  rightFunction = () => {},
}: DefaultModalFooterProps) {
  return (
    <div
      css={css`
        width: 100%;
        align-content: flex-end;
      `}
    >
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
          div:nth-of-type(1) {
            display: none;
          }
        `}
      >
        {leftFunction && (
          <Button colorSchema={"gray"} onClick={leftFunction}>
            {leftText}
          </Button>
        )}
        <Button colorSchema={"primary"} onClick={rightFunction}>
          {rightText}
        </Button>
      </ButtonProvider>
    </div>
  );
}
