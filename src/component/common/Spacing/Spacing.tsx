import styled from "@emotion/styled";

interface SpacingProps {
  size: number;
  direction?: "vertical" | "horizontal";
}

export const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = "vertical" }) =>
    direction === "vertical"
      ? `
      height: ${size}rem
    `
      : `width: ${size}rem`}
`;
