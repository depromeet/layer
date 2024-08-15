import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type Props = {
  teamName: string | undefined;
  spaceId: string | undefined;
};

export function CreateRetrospectiveSheet({ teamName, spaceId }: Props) {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding-top: 2rem;
        gap: 3rem;
      `}
    >
      <Typography variant="title20Bold">
        {teamName}에 맞는 <br />
        회고템플릿을 찾아볼까요?
      </Typography>
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 0.8rem;
        `}
      >
        <button
          onClick={() => {
            navigate("/retrospect/new", {
              state: { spaceId: spaceId },
            });
          }}
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              span {
                color: ${DESIGN_TOKEN_COLOR.gray00};
              }
            }
          `}
        >
          <Icon icon="ic_stars" size={4.8} />
          <Typography as="span" variant="body16Medium" color="black">
            추천받기
          </Typography>
        </button>
        <button
          onClick={() => {
            if (spaceId)
              navigate(PATHS.template(spaceId), {
                state: { createRetrospect: true },
              });
          }}
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              span {
                color: ${DESIGN_TOKEN_COLOR.gray00};
              }
            }
          `}
        >
          <Icon icon="ic_list" size={4.8} color={DESIGN_TOKEN_COLOR.purple600} />
          <Typography variant="body16Medium">리스트보기</Typography>
        </button>
      </div>
    </div>
  );
}
