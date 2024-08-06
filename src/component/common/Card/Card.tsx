import { css } from "@emotion/react";

type CardProps = {
  width?: string;
  rounded?: keyof typeof BORDER_RADIUS;
  shadow?: boolean;
  padding?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BORDER_RADIUS = {
  sm: ".8rem",
  md: "1.2rem",
} as const;

export function Card({ width = "100%", rounded = "sm", shadow = true, padding = "2rem", children, ...props }: CardProps) {
  return (
    <div
      css={[
        css`
          width: ${width};
          border-radius: ${BORDER_RADIUS[rounded]};
          background-color: #fff; // FIXME - design token
          box-shadow: ${shadow ? "0 .4rem 1.2rem rgba(0 0 0 / 4%)" : "none"};
          padding: ${padding};
        `,
      ]}
      {...props}
    >
      {children}
    </div>
  );
}
