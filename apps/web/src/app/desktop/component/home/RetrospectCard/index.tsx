import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Retrospect } from "@/types/retrospect";
import { formatDateAndTime } from "@/utils/date";
import { ProceedingTextBox } from "@/component/space/view/ProceedingTextBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATHS } from "@layer/shared";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { Prepare } from "../../retrospectWrite/prepare";
import TemplateCardManageToggleMenu from "@/component/retrospect/template/card/TemplateCardManageToggleMenu";

interface RetrospectCardProps {
  retrospect: Retrospect;
  spaceId?: string | null;
}

export default function RetrospectCard({ retrospect, spaceId }: RetrospectCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openFunnelModal } = useFunnelModal();

  const {
    spaceId: retrospectSpaceId,
    retrospectId,
    title,
    introduction,
    deadline,
    totalCount,
    writeCount,
    writeStatus,
    retrospectStatus,
    analysisStatus,
  } = retrospect;

  const targetSpaceId = spaceId ?? retrospectSpaceId;

  const urlRetrospectId = searchParams.get("retrospectId");
  const isSelected = urlRetrospectId && parseInt(urlRetrospectId) === retrospectId;
  const isIntroduction = introduction?.trim();

  const handleCardClick = () => {
    // 진행 중인 회고 클릭 시
    if (targetSpaceId && retrospectStatus === "PROCEEDING") {
      if (writeStatus === "NOT_STARTED") {
        // 아직 시작 안 한 경우 → 시작 화면 모달
        openFunnelModal({
          title: "",
          step: "retrospectWrite",
          contents: <Prepare spaceId={Number(targetSpaceId)} retrospectId={retrospectId} title={title} introduction={introduction} />,
        });
      } else if (writeStatus === "DONE") {
        navigate(PATHS.retrospectAnalysis(String(targetSpaceId), retrospectId, title));
      } else {
        // 작성 중인 경우 → 바로 작성 페이지로
        navigate(PATHS.retrospectWrite(String(targetSpaceId), retrospectId, title, introduction));
      }
    }

    // 마감된 회고 클릭 시
    if (targetSpaceId && retrospectStatus === "DONE") {
      navigate(PATHS.retrospectAnalysis(String(targetSpaceId), retrospectId, title));
    }
  };

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 29.6rem;
        height: fit-content;
        max-height: 13.8rem;
        padding: 1.6rem;
        background-color: white;
        border-radius: 1.2rem;
        transition: all 0.2s ease;
        cursor: pointer;
        border: ${isSelected ? `1px solid ${DESIGN_TOKEN_COLOR.blue400}` : "none"};
        box-shadow: ${isSelected ? "0 4px 12px 0 rgba(6, 8, 12, 0.04)" : "none"};

        &:hover {
          border-color: ${isSelected ? DESIGN_TOKEN_COLOR.blue400 : DESIGN_TOKEN_COLOR.gray400};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}
      onClick={handleCardClick}
    >
      {/* ---------- 상단 라벨 ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        `}
      >
        <ProceedingTextBox writeStatus={writeStatus} analysisStatus={analysisStatus} />
        <TemplateCardManageToggleMenu retrospect={retrospect} />
      </div>

      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray900">
        {title}
      </Typography>

      {/* ---------- 설명 ----------*/}
      {isIntroduction && (
        <div
          css={css`
            margin-top: 0.4rem;
          `}
        >
          <Typography
            variant="body12SemiBold"
            color="gray800"
            css={css`
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {introduction}
          </Typography>
        </div>
      )}

      {/* ---------- 하단 정보 ---------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.8rem;
        `}
      >
        <Typography variant="body12SemiBold" color="gray500">
          {deadline ? `마감 예정 | ${formatDateAndTime(deadline)}` : "모든 인원 제출 시 마감"}
        </Typography>

        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.2rem;
          `}
        >
          <Icon icon="ic_person" size={1.8} color={DESIGN_TOKEN_COLOR.blue600} />
          <Typography variant="body12SemiBold" color="gray500">
            {writeCount} / {totalCount}
          </Typography>
        </div>
      </div>
    </section>
  );
}
