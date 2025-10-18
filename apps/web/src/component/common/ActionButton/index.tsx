import { css } from "@emotion/react";
import { Typography } from "../typography";
import { ComponentProps } from "react";
import { DESIGN_TOKEN_TEXT } from "@/style/designTokens";

type ActionButtonProps = {
  label: string;
  variant: keyof typeof DESIGN_TOKEN_TEXT;
  color: ComponentProps<typeof Typography>["color"];
  onClick: () => void;
};

export default function ActionButton({ label, variant, color, onClick }: ActionButtonProps) {
  return (
    <Typography
      variant={variant}
      color={color}
      css={css`
        cursor: pointer;
      `}
      onClick={onClick}
    >
      {label}
    </Typography>
  );
}
