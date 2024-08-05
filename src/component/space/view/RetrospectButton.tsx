import { css } from "@emotion/react";
import { useMemo } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RetrospectButtonProps = {
  status: "PROCEEDING" | "DONE" | "HAS_WRITING";
  retrospectId?: number;
  spaceId?: string;
};

export function RetrospectButton({ status, retrospectId, spaceId }: RetrospectButtonProps) {
  const navigate = useNavigate();
  const { color, route, text } = useMemo<{ text: string; route: readonly [string, NavigateOptions]; color: string }>(() => {
    return {
      DONE: {
        text: "분석 확인",
        route: [
          "/분석",
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.grey900,
      },
      HAS_WRITING: {
        route: [
          `/write`,
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.blue600,
        text: "회고 작성",
      },
      PROCEEDING: {
        route: [
          `/edit`,
          {
            state: {
              retrospectId,
              spaceId,
            },
          },
        ] as const,
        color: DESIGN_SYSTEM_COLOR.blue600,
        text: "회고 수정",
      },
    }[status];
  }, [retrospectId, spaceId, status]);
  const handleNavigate = () => {
    navigate(...route);
  };
  return (
    <button
      onClick={handleNavigate}
      css={css`
        width: auto;
        height: 4rem;
        background-color: ${color};
        border-radius: 0.8rem;
        padding: 1rem 2.4rem;
      `}
    >
      <Typography
        variant="B2_SEMIBOLD"
        color="white"
        css={css`
          white-space: nowrap;
        `}
      >
        {text}
      </Typography>
    </button>
  );
}
