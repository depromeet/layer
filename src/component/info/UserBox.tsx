import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type UserBoxProps = {
  name: string;
  imgUrl: string;
  onClick: () => void;
};

export function UserBox({ name, imgUrl, onClick }: UserBoxProps) {
  return (
    <>
      <div
        onClick={onClick}
        css={css`
          width: 100%;
          height: 7.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 1.2rem;
          box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
          padding: 1.6rem;
          padding-right: 2.2rem;
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 2rem;
            align-items: center;
          `}
        >
          <img
            src={imgUrl}
            css={css`
              width: 4.2rem;
              height: 4.2rem;
              border-radius: 100%;
            `}
          />
          <Typography variant="body16Medium">{name}</Typography>
        </div>
        <Icon icon="ic_after" size={1.6} color="#424242" />
      </div>
    </>
  );
}
