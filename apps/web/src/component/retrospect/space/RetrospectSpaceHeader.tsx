import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { RetrospectCreate } from "@/app/desktop/component/retrospectCreate";
import { Icon } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import SpaceManageToggleMenu from "@/component/space/edit/SpaceManageToggleMenu";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useActionModal } from "@/hooks/useActionModal";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { isSpaceLeader } from "@/utils/userUtil";
import { css } from "@emotion/react";
import MemberManagement from "./members/MemberManagement";
import { useQueries } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { TemplateList } from "@/app/desktop/component/retrospect/template/list";

export default function RetrospectSpaceHeader() {
  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();
  const currentSpace = useAtomValue(currentSpaceState);
  const { spaceId } = useRequiredParams<{ spaceId: string }>();

  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const { name, leader, introduction } = currentSpace || {};
  const isLeader = isSpaceLeader(leader?.id);

  const [{ data: spaceInfo }] = useQueries({
    queries: [useApiOptionsGetSpaceInfo(spaceId)],
  });

  const handleRetrospectCreate = () => {
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
          openActionModal({
            title: "",
            contents: <TemplateChoice />,
          });
        },
      });
    }
  };

  const handleMoveToListTemplate = () => {
    openFunnelModal({
      title: "템플릿 리스트",
      step: "listTemplate",
      contents: <TemplateList />,
    });
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
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.6rem;
            `}
          >
            <Typography variant="heading24Bold">{name}</Typography>
            {isLeader && <SpaceManageToggleMenu spaceId={spaceId} iconSize={2.4} iconColor={"gray900"} />}
          </div>
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
              onClick={handleMoveToListTemplate}
            >
              <Icon icon={"ic_document_color"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />

              <Typography variant="body14SemiBold" color="gray600">
                {spaceInfo?.formTag}
              </Typography>
              <Icon icon={"ic_chevron_down"} size={1.6} color={DESIGN_TOKEN_COLOR.gray600} />
            </div>

            <MemberManagement spaceId={spaceId} />
          </div>
        </div>
        <Typography variant="body14Medium" color="gray600">
          {introduction}
        </Typography>
      </div>
    </section>
  );
}
