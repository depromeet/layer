import { css } from "@emotion/react";
import { forwardRef, useContext } from "react";

import { InputContext } from "./InputLabelContainer";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  count?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function ({ id, width = "100%", count, ...props }, ref) {
  const { maxLength, value } = props;
  const inputContext = useContext(InputContext);
  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid ${"#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
          display: flex;
        `}
      >
        <input
          ref={ref}
          id={id || inputContext?.id}
          css={css`
            flex-grow: 1;
            ::placeholder {
              color: ${DESIGN_SYSTEM_COLOR.lightGrey5};
            }
          `}
          {...props}
        />
        {/* FIXME - typography 컬러 넣기 !! */}
        {count && maxLength && <Typography variant="CAPTION" color={"lightGrey"}>{`${value.length}/${maxLength}`}</Typography>}
      </div>
    </div>
  );
});

Input.displayName = "Input";
