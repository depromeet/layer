import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";

export function Error() {
  const navigate = useNavigate();

  return (
    <DefaultLayout appBarVisible={false}>
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          row-gap: 1.2rem;
          animation: ${ANIMATION.FADE_IN} ease 0.4s;
        `}
      >
        <Icon icon={"ic_error"} size={14} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.4rem;
          `}
        >
          <Typography variant={"subtitle18SemiBold"} as={"span"} color={"gray900"}>
            오류가 발생했어요
          </Typography>
          <Typography variant={"body16Medium"} as={"span"} color={"gray600"}>
            잠시 후에 다시 시도해주세요
          </Typography>
        </div>
        <Button colorSchema={"sky"} onClick={() => navigate(PATHS.home())}>
          <Typography variant={"subtitle16SemiBold"} as={"span"} color={"gray00"}>
            다시 시도
          </Typography>
        </Button>
      </div>
    </DefaultLayout>
  );
}
