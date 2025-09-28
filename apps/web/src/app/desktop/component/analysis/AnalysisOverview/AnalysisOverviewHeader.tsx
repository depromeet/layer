import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";

export default function AnalysisOverviewHeader() {
  const currentSelectedSpace = useAtomValue(currentSpaceState);

  const { name, introduction, memberCount, formTag } = currentSelectedSpace || {};

  return (
    <section>
      {/* ---------- 스페이스 이름 ---------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.8rem;
        `}
      >
        <Typography variant="heading24Bold" color="gray900">
          {name}
        </Typography>
        <Icon icon="ic_more" size={2.0} color={DESIGN_TOKEN_COLOR.gray900} />
      </div>

      {/* ---------- 스페이스 소개 ---------- */}
      <Typography variant="body14SemiBold" color="gray600">
        {introduction}
      </Typography>

      {/* ---------- 회고 추가 / 회고 템플릿 / 인원수 ---------- */}
      <section
        css={css`
          display: flex;
          gap: 0.6rem;
          margin-top: 1.8rem;
        `}
      >
        {/* ---------- 회고 추가 버튼 ---------- */}
        <article
          css={css`
            display: flex;
            padding: 0.8rem 1.2rem;
            background-color: ${DESIGN_TOKEN_COLOR.blue600};
            border-radius: 0.8rem;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            cursor: pointer;
          `}
        >
          <Icon icon={"ic_plus"} size={1.2} color={DESIGN_TOKEN_COLOR.gray00} />
          <Typography variant="body14SemiBold" color="gray00">
            회고 추가
          </Typography>
        </article>

        {/* ---------- 회고 템플릿 필터 ---------- */}
        <article
          css={css`
            display: flex;
            padding: 0.8rem;
            border-radius: 0.8rem;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            background-color: ${DESIGN_TOKEN_COLOR.white};
            flex: 1;
            cursor: pointer;
          `}
        >
          <Icon icon={"ic_document_color"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />
          <Typography variant="body14SemiBold" color="gray600">
            {formTag}
          </Typography>
          <Icon icon={"ic_chevron_down"} size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
        </article>

        {/* ---------- 회고 인원수 필터 ---------- */}
        <article
          css={css`
            display: flex;
            padding: 0.8rem;
            border-radius: 0.8rem;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
            background-color: ${DESIGN_TOKEN_COLOR.white};
            flex: 1;
            cursor: pointer;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.6rem;
            `}
          >
            <Icon icon={"ic_team"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />
            <Typography variant="body14SemiBold" color="gray600">
              {memberCount}
            </Typography>
          </div>
          <Icon icon={"ic_chevron_down"} size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
        </article>
      </section>

      {/* ---------- 실행목표 ---------- */}
      <section
        css={css`
          margin-top: 1.6rem;
        `}
      >
        <article
          css={css`
            display: flex;
            height: 3.7rem;
            padding: 0.8rem 1.2rem;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            border-radius: 0.8rem;
            background: ${DESIGN_TOKEN_COLOR.gray00};
            cursor: pointer;
          `}
        >
          <Typography variant="body14Strong" color="gray900">
            실행목표
          </Typography>
          <Icon icon="ic_chevron_down" size={1.6} color={DESIGN_TOKEN_COLOR.gray900} />
        </article>
      </section>
    </section>
  );
}
