import { css } from "@emotion/react";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import { useAtomValue, useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { usePostRecentTemplateId } from "@/hooks/api/template/usePostRecentTemplateId";
import { useResetAtom } from "jotai/utils";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { FUNNEL_STEP_BACK_CONFIG, FUNNEL_STEPS_WITH_BACK } from "@/app/desktop/component/retrospect/template/constants";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@/component/common/Icon";
import { Typography } from "../typography";

export default function DesktopFunnelModal() {
  const { open, close } = useModal();
  const { funnelModalState, openFunnelModal, closeFunnelModal } = useFunnelModal();
  const resetRetroCreateData = useResetAtom(retrospectCreateAtom);
  const { spaceId, templateId } = useAtomValue(retrospectInitialState);
  const { mutate: postRecentTemplateId } = usePostRecentTemplateId(Number(spaceId));
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const [, setSearchParams] = useSearchParams();

  if (!funnelModalState.isOpen) return null;

  const shouldShowBack = FUNNEL_STEPS_WITH_BACK.includes(funnelModalState.step || "");
  const handleBack = () => {
    // 만약 onPrevious를 주입받았다면, onPrevious를 우선적으로 실행해요
    if (funnelModalState.onPrevious) {
      funnelModalState.onPrevious();
      return;
    }

    const backConfig = FUNNEL_STEP_BACK_CONFIG[funnelModalState.step as keyof typeof FUNNEL_STEP_BACK_CONFIG];

    openFunnelModal({
      title: backConfig.title,
      step: backConfig.step,
      contents: backConfig.contents,
    });
  };

  const quitPage = () => {
    postRecentTemplateId({ formId: Number(templateId), spaceId: Number(spaceId) });
    resetRetroCreateData();
    closeFunnelModal();
  };
  const handleClose = () => {
    if (funnelModalState.step === "retrospectCreate") {
      open({
        title: "회고 생성을 중단하시겠어요?",
        contents: "선택한 템플릿은 임시저장 되어요",
        options: {
          buttonText: ["취소", "나가기"],
        },
        onClose: () => {
          close();
        },
        onConfirm: () => {
          setRetrospectValue((prev) => ({
            ...prev,
            saveTemplateId: false,
          }));
          quitPage();
        },
      });
    } else {
      // readOnly 권한일 때 템플릿 상세 페이지의 쿼리 파라미터 제외
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (newParams.has("template_mode")) {
          newParams.delete("template_mode");
        }
        return newParams;
      });

      closeFunnelModal();
    }
  };

  const BACKGROUND_COLORS: Record<string, string> = {
    retrospectWrite: DESIGN_TOKEN_COLOR.gray900,
    listTemplate: DESIGN_TOKEN_COLOR.gray100,
  };

  const curBackgroundColor = (funnelModalState.step && BACKGROUND_COLORS[funnelModalState.step]) ?? "#fff";

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: ${funnelModalState.overlayIndex};
          background-color: rgba(0, 0, 0, 0.5);
        `}
      >
        <div
          css={css`
            width: 52rem;
            height: 65.2rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: ${curBackgroundColor};
            border-radius: 2rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 0 2.4rem;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopFunnelModalHeader
            title={funnelModalState.title}
            onClose={handleClose}
            onBack={shouldShowBack ? handleBack : undefined}
            tag={funnelModalState.templateTag}
            backgroundColor={curBackgroundColor}
            isRetrospectWrite={funnelModalState.step === "retrospectWrite"}
          />
          {funnelModalState.contents}
        </div>
      </div>
    </Portal>
  );
}

/* ----------- 퍼널 모달 헤더 UI ----------- */
export type DesktopModalHeaderProps = {
  title: string;
  tag?: string;
  backgroundColor: string;
  isRetrospectWrite: boolean;
  onBack?: () => void;
  onClose: () => void;
};

function DesktopFunnelModalHeader({ title, tag, backgroundColor, isRetrospectWrite, onBack, onClose }: DesktopModalHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 1001;
        padding-top: 2.4rem;
        background-color: ${backgroundColor};
      `}
    >
      {onBack && (
        <button
          onClick={onBack}
          css={css`
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
        >
          <Icon
            icon={"ic_arrow_back_white"}
            css={css`
              path {
                fill: #212329;
                transition: 0.4s all;
              }
            `}
            size={2.4}
          />
        </button>
      )}
      <div
        css={css`
          display: flex;
          flex: 1;
          align-items: center;
          margin-left: ${onBack && "1.2rem"};
        `}
      >
        <Typography variant="title22Bold">{title}</Typography>
        {onBack && (
          <span
            css={css`
              display: inline-block;
              font-size: 1.2rem;
              font-weight: 600;
              line-height: 140%;
              padding: 0.4rem 0.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.blue600};
              border-radius: 0.4rem;
              color: #fff;
              margin-left: 1.2rem;
            `}
          >
            {tag}
          </span>
        )}
      </div>

      <button
        onClick={onClose}
        css={css`
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          border-radius: 0.4rem;

          &:hover {
            background-color: ${!isRetrospectWrite && DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon
          icon={"ic_quit"}
          css={css`
            color: ${isRetrospectWrite ? "#fff" : "#212329"};
            path {
              fill: #212329;
              transition: 0.4s all;
            }
          `}
          onClick={onClose}
          size={"2.4rem"}
        />
      </button>
    </div>
  );
}
