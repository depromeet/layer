import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";

type Props = {
  teamName: string;
};

export function CreateRetrospectiveSheet({ teamName }: Props) {
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
          justify-content: space-between;
          gap: 0.8rem;
        `}
      >
        <button
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
          `}
        >
          <Icon icon="ic_cylinder" size={4.8} />
          <Typography variant="B1_BOLD">추천받기</Typography>
        </button>
        <button
          css={css`
            width: 16.3rem;
            background-color: #f6f8fa;
            border-radius: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.6rem;
            padding: 3.65rem 0;
          `}
        >
          <Icon icon="ic_earth" size={4.8} color="#8C81F7" />
          <Typography variant="B1_BOLD">리스트보기</Typography>
        </button>
      </div>
    </div>
  );
}
