import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type TeamIndividualToggleProps = {
  selectedView: "팀" | "개인";
  handleToggle: (view: "팀" | "개인") => void;
};

export default function TeamIndividualToggle({ selectedView, handleToggle }: TeamIndividualToggleProps) {
  return (
    <div
      css={css`
        display: flex;
        width: fit-content;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        border-radius: 1.2rem;
        padding: 0.4rem;
        margin-top: 2rem;
      `}
    >
      <button
        onClick={() => handleToggle("개인")}
        css={css`
          width: 4.5rem;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 0.8rem;
          background-color: ${selectedView === "개인" ? DESIGN_TOKEN_COLOR.gray700 : "transparent"};
          transition: all 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${selectedView === "개인" ? DESIGN_TOKEN_COLOR.gray600 : DESIGN_TOKEN_COLOR.gray200};
          }
        `}
      >
        <Typography variant="body12Bold" color={selectedView === "개인" ? "gray00" : "gray600"}>
          개인
        </Typography>
      </button>

      <button
        onClick={() => handleToggle("팀")}
        css={css`
          width: 4.5rem;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 0.8rem;
          background-color: ${selectedView === "팀" ? DESIGN_TOKEN_COLOR.gray700 : "transparent"};
          transition: all 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${selectedView === "팀" ? DESIGN_TOKEN_COLOR.gray600 : DESIGN_TOKEN_COLOR.gray200};
          }
        `}
      >
        <Typography variant="body12Bold" color={selectedView === "팀" ? "gray00" : "gray600"}>
          팀
        </Typography>
      </button>
    </div>
  );
}
