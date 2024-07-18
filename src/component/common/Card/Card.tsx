import { css, Interpolation, Theme } from "@emotion/react";

type CardProps = {
  width?: string;
  height?: string;
  rounded?: keyof typeof BORDER_RADIUS;
  shadow?: boolean;
  padding?: string;
  children: React.ReactNode;
  styles?: Interpolation<Theme>;
} & React.HTMLAttributes<HTMLDivElement>;

const BORDER_RADIUS = {
  sm: ".8rem",
  md: "1.2rem",
} as const;

export function Card({ width = "100%", height = "34rem", rounded = "sm", shadow = true, padding = "3rem", styles, children }: CardProps) {
  return (
    <div
      css={[
        css`
          width: ${width};
          height: ${height};
          border-radius: ${BORDER_RADIUS[rounded]};
          background-color: #fff; // FIXME - design token
          box-shadow: ${shadow ? "0 .4rem 1.2rem rgba(0 0 0 / 4%)" : "none"};
          padding: ${padding};
        `,
        styles,
      ]}
    >
      {children}
    </div>
  );
}
