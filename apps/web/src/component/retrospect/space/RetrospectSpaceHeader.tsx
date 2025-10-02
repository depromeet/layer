import { RecommendTemplatePage } from "@/app/desktop/retrospect/template/RecommendTemplatePage";
import { RetrospectCreate } from "@/app/desktop/retrospectCreate/RetrospectCreate";
import { Icon } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useQueries } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function RetrospectSpaceHeader() {
  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const currentSpace = useAtomValue(currentSpaceState);
  const { spaceId } = useRequiredParams<{ spaceId: string }>();

  const [_, setRetrospectValue] = useAtom(retrospectInitialState);

  const { name, introduction } = currentSpace || {};

  const [{ data: spaceInfo }] = useQueries({
    queries: [useApiOptionsGetSpaceInfo(spaceId)],
  });

  useEffect(() => {
    setRetrospectValue((prev) => ({
      ...prev,
      spaceId,
    }));
  }, [spaceId, setRetrospectValue]);

  const handleRetrospectCreate = () => {
    console.log("spaceInfo?.formId : " + spaceInfo?.formId);
    if (spaceInfo?.formId) {
      setRetrospectValue((prev) => ({
        ...prev,
        templateId: String(spaceInfo.formId),
      }));

      open({
        title: "전에 진행했던 템플릿이 있어요!\n계속 진행하시겠어요?",
        contents: "",
        options: {
          buttonText: ["재설정", "진행하기"],
        },
        onConfirm: () => {
          openFunnelModal({
            title: "",
            step: "retrospectCreate",
            contents: <RetrospectCreate />,
          });
        },
        onClose: () => {
          openFunnelModal({
            title: "",
            step: "template",
            contents: <RecommendTemplatePage />,
          });
        },
      });
    }
  };

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
              onClick={handleRetrospectCreate}
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
              <Icon icon={"ic_team"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />

              <Typography variant="body14SemiBold" color="gray600">
                11
              </Typography>
              <Icon icon={"ic_chevron_down"} size={1.6} color={DESIGN_TOKEN_COLOR.gray600} />
            </div>
          </div>
        </div>
        <Typography variant="body14Medium">{introduction}</Typography>
      </div>
    </section>
  );
}
