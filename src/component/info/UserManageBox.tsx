import { css } from "@emotion/react";

import { InfoBox } from "./InfoBox";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function UserManageBox() {
  return (
    <>
      <div
        css={css`
          width: 100%;
          height: auto;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 1.2rem;
          box-shadow: 0rem 0.4rem 1.2rem 0rem #06080c0a;
          padding: 2rem;
          padding-right: 2.2rem;
          padding-bottom: 1.2rem;
          display: flex;
          flex-direction: column;
        `}
      >
        <Typography
          variant="subtitle14SemiBold"
          color="gray600"
          css={css`
            margin-bottom: 0.8rem;
          `}
        >
          운영방침
        </Typography>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <InfoBox
            content="계정탈퇴"
            onClick={() => {
              console.log("계정탈퇴 실행");
            }}
          />
          <div
            css={css`
              width: 100%;
              height: 4.8rem;
              display: flex;
              align-items: center;
            `}
          >
            <Typography variant="body16Medium">로그아웃</Typography>
          </div>
        </div>
      </div>
    </>
  );
}
