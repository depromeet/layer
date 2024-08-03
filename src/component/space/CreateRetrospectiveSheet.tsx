import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type Props = {
  teamName: string | undefined;
};

export function CreateRetrospectiveSheet({ teamName }: Props) {
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
      <Typography variant="S1">
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
            navigate("/retrospect/new");
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
              background-color: rgba(108, 156, 250, 1);
              span {
                color: white;
              }
            }
          `}
        >
          <Icon icon="ic_stars" size={4.8} />
          <Typography as="span" variant="B1_BOLD" color="black">
            추천받기
          </Typography>
        </button>
        <button
          onClick={() => {
            //커스텀 템플릿 URL로 변경
            navigate("/retrospect/custom");
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
              background-color: rgba(108, 156, 250, 1);
              span {
                color: white;
              }
            }
          `}
        >
          <Icon icon="ic_list" size={4.8} color="#8C81F7" />
          <Typography variant="B1_BOLD">리스트보기</Typography>
        </button>
      </div>
    </div>
  );
}
