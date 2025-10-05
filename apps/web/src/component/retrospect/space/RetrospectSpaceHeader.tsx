import { Icon } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import MemberManagement from "./members/MemberManagement";

export default function RetrospectSpaceHeader() {
  const currentSpace = useAtomValue(currentSpaceState);

  const { name, introduction } = currentSpace || {};

  return (
    <section
      css={css`
        width: 100%;
        margin: 0 auto;
        display: flex;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          row-gap: 0.8rem;
        `}
      >
        <div
          css={css`
            display: flex;
            row-gap: 0.8rem;
            justify-content: space-between;
          `}
        >
          <Typography variant="heading24Bold">{name}</Typography>
          <div
            css={css`
              display: flex;
              gap: 1.6rem;
            `}
          >
            <div
              css={css`
                display: flex;
                padding: 0.8rem 1.2rem;
                background-color: ${DESIGN_TOKEN_COLOR.blue600};
                border-radius: 0.8rem;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                cursor: pointer;
                color: ${DESIGN_TOKEN_COLOR.gray00};
              `}
            >
              <Icon icon={"ic_plus"} size={1.2} color={DESIGN_TOKEN_COLOR.gray00} />

              <Typography variant="body14SemiBold" color="gray00">
                회고 추가하기
              </Typography>
            </div>
            <div
              css={css`
                display: flex;
                padding: 0.8rem 1.2rem;
                border-radius: 0.8rem;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                cursor: pointer;
                background-color: ${DESIGN_TOKEN_COLOR.white};
                color: ${DESIGN_TOKEN_COLOR.gray600};
              `}
            >
              <Icon icon={"ic_document_color"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />

              <Typography variant="body14SemiBold" color="gray600">
                KPT
              </Typography>
              <Icon icon={"ic_chevron_down"} size={1.6} color={DESIGN_TOKEN_COLOR.gray600} />
            </div>

            <MemberManagement />
          </div>
        </div>
        <Typography variant="body14Medium">{introduction}</Typography>
      </div>
    </section>
  );
}
