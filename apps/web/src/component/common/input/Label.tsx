import { css, Interpolation, Theme } from "@emotion/react";
import { useContext } from "react";

import { InputContext } from "./InputLabelContainer";

import { Typography } from "@/component/common/typography";

type LabelProps = {
  order?: number;
  styles?: Interpolation<Theme>;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ id, children, order, styles }: LabelProps) {
  const inputContext = useContext(InputContext);

  return (
    <label
      htmlFor={id || inputContext?.id}
      css={
        order
          ? css`
              display: flex;
              align-items: center;
              gap: 0.8rem;
            `
          : null
      }
    >
      {order && (
        <div
          css={[
            css`
              background-color: #212529; // FIXME: 디자인 토큰 적용하기
              width: 2rem;
              height: 2rem;
              border-radius: 0.4rem;
              vertical-align: middle;
              text-align: center;
            `,
            styles,
          ]}
        >
          {/* FIXME text 컴포넌트 적용하기 */}
          <span
            css={css`
              color: #fff;
              font-size: 1rem;
              font-weight: 600;
            `}
          >
            {order}
          </span>
        </div>
      )}
      <Typography variant={"subtitle14SemiBold"} color={"gray900"}>
        {children}
      </Typography>
    </label>
  );
}
