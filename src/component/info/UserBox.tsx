import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type UserBoxProps = {
  name: string;
  imgUrl?: string;
};

export function UserBox({ name, imgUrl }: UserBoxProps) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(PATHS.myInfoModify());
        }}
        css={css`
          width: 100%;
          cursor: pointer;
          height: 7.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 1.2rem;
          box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
          padding: 1.6rem;
          padding-right: 2.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 2rem;
            align-items: center;
          `}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              css={css`
                width: 4.2rem;
                height: 4.2rem;
                border-radius: 100%;
                object-fit: cover;
              `}
            />
          ) : (
            <Icon icon="basicProfile" size={4.2} />
          )}
          <Typography variant="body16Medium">{name}</Typography>
        </div>
        <Icon icon="ic_after" size={1.6} color="#424242" />
      </div>
    </>
  );
}
