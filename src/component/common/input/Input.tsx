import { css } from "@emotion/react";
import { forwardRef, useContext, useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);
  const inputContext = useContext(InputContext);
  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid;
          border-color: ${isFocused ? DESIGN_SYSTEM_COLOR.theme3 : "#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem;
          display: flex;
          transition: 0.2s all;
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {/* FIXME - typography 컬러 넣기 !! */}
        {count && maxLength && (
          <>
            <Typography variant="CAPTION" color={value.length ? "theme3" : "lightGrey"}>
              {value.length}
            </Typography>
            <Typography variant="CAPTION" color={"lightGrey"}>{`/${maxLength}`}</Typography>
          </>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";
