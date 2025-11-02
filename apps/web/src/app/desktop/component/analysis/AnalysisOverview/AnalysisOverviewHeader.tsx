import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import SpaceManageToggleMenu from "@/component/space/edit/SpaceManageToggleMenu";
import { useApiOptionsGetSpaceInfo } from "@/hooks/api/space/useApiOptionsGetSpaceInfo";
import { useActionModal } from "@/hooks/useActionModal";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useModal } from "@/hooks/useModal";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { isSpaceLeader } from "@/utils/userUtil";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { RetrospectCreate } from "../../retrospectCreate";
import { TemplateChoice } from "../../retrospect/choice";
import { TemplateList } from "../../retrospect/template/list";
import MemberManagement from "@/component/retrospect/space/members/MemberManagement";
import { useState } from "react";
import ActionItems from "./ActionItems";

export default function AnalysisOverviewHeader() {
  const { open } = useModal();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();

  // 실행목표 토글 상태
  const [actionItemToggle, setActionItemToggle] = useState(false);

  // TODO: 새로고침해도 query를 통해서 데이터를 불러오도록 수정 필요
  const currentSelectedSpace = useAtomValue(currentSpaceState);
  const setRetrospectValue = useSetAtom(retrospectInitialState);

  const { name, introduction, formTag, leader, id: spaceId } = currentSelectedSpace || {};
  const isLeader = isSpaceLeader(leader?.id);

  const { data: spaceInfo } = useQuery(useApiOptionsGetSpaceInfo(spaceId));

  // 회고 추가 함수
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

  // 템플릿 변경 함수
  const handleMoveToListTemplate = () => {
    openFunnelModal({
      title: "템플릿 리스트",
      step: "listTemplate",
      contents: <TemplateList />,
    });
  };

  const handleOpenActionItem = () => {
    setActionItemToggle((prev) => !prev);
  };

  return (
    <section
      css={css`
        position: relative;

        // * 스크롤 페이드 효과
        ::after {
          content: "";
          position: absolute;
          bottom: -4rem;
          left: 0;
          right: 0;
          height: 4rem;
          background: linear-gradient(180deg, #f2f4f8 28.76%, rgba(242, 244, 248, 0) 100%);
          pointer-events: none;
        }
      `}
    >
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
        {isLeader && <SpaceManageToggleMenu spaceId={spaceId!} iconSize={2.0} iconColor={"gray900"} />}
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
            white-space: nowrap;
          `}
          onClick={handleRetrospectCreate}
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
          onClick={handleMoveToListTemplate}
        >
          <Icon icon={"ic_document_color"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />
          <Typography variant="body14SemiBold" color="gray600">
            {formTag}
          </Typography>
          <Icon icon={"ic_chevron_down"} size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
        </article>

        {/* ---------- 회고 인원수 필터 ---------- */}
        <MemberManagement spaceId={spaceId as string} />
      </section>

      {/* ---------- 실행목표 ---------- */}
      <section
        css={css`
          margin-top: 1.6rem;
          background: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 0.8rem;
          overflow: hidden;
        `}
      >
        {/* 클릭 영역 */}
        <div
          css={css`
            display: flex;
            padding: 0.8rem 1.2rem;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          `}
          onClick={handleOpenActionItem}
        >
          <Typography variant="body14Strong" color="gray900">
            실행목표
          </Typography>
          <Icon
            icon="ic_chevron_down"
            size={1.6}
            color={DESIGN_TOKEN_COLOR.gray900}
            css={css`
              transform: ${actionItemToggle ? "rotate(180deg)" : "rotate(0deg)"};
              transition: transform 0.4s ease;
            `}
          />
        </div>

        {/* ---------- 실행 목표 콘텐츠 부분 ---------- */}
        <div
          css={css`
            overflow: hidden;
            transition: all 0.4s ease;
            height: ${actionItemToggle ? "29.4rem" : "0"};
            opacity: ${actionItemToggle ? 1 : 0};
          `}
        >
          <div
            css={css`
              padding: 0 1.2rem 0.8rem 1.2rem;
            `}
          >
            <hr
              css={css`
                border: solid 0.05rem rgba(197, 213, 243, 0.4);
                width: 100%;
                margin: 0.4rem 0 0.6rem 0;
              `}
            />
            <div
              css={css`
                height: calc(29.6rem - 1.1rem);
              `}
            >
              <ActionItems />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
