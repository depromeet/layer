import { css } from "@emotion/react";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export function Switch({ checked, onChange, disabled = false, "aria-label": ariaLabel }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      css={css`
        flex-shrink: 0;
        position: relative;
        width: 4.4rem;
        height: 2.4rem;
        border-radius: 1.2rem;
        background-color: ${checked ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
        transition: background-color 0.2s ease;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}
    >
      <span
        css={css`
          position: absolute;
          top: 0.2rem;
          left: ${checked ? "2.2rem" : "0.2rem"};
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          box-shadow: 0 0.1rem 0.2rem rgba(6, 8, 12, 0.16);
          transition: left 0.2s ease;
        `}
      />
    </button>
  );
}
