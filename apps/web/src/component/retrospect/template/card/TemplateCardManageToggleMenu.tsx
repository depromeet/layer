import { DesktopDateTimeInput } from "@/app/desktop/component/retrospectCreate/DesktopDateTimeInput";
import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { ToggleMenu } from "@/component/common/toggleMenu";
import { useApiCloseRetrospect } from "@/hooks/api/retrospect/close/useApiCloseRetrospect";
import { usePatchRetrospect } from "@/hooks/api/retrospect/edit/usePatchRetrospect";
import { useApiDeleteRetrospect } from "@/hooks/api/retrospect/useApiDeleteRetrospect";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useInput } from "@/hooks/useInput";
import { useModal } from "@/hooks/useModal";
import useToggleMenu from "@/hooks/useToggleMenu";
import { queryClient } from "@/lib/tanstack-query/queryClient";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Retrospect } from "@/types/retrospect";
import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TemplateCardManageToggleMenu({
  iconSize = 2.0,
  iconColor = "gray500",
  retrospect,
  isLeader = true,
}: {
  iconSize?: number | string;
  iconColor?: keyof typeof DESIGN_TOKEN_COLOR;
  retrospect: Retrospect;
  isLeader?: boolean;
}) {
  const { isShowMenu, showMenu } = useToggleMenu();
  const { mutateAsync: mutateDeleteRetrospect } = useApiDeleteRetrospect();
  const { mutateAsync: mutateCloseRetrospect } = useApiCloseRetrospect();
  const { open: openConfirmModal, close: closeConfirmModal, setProgress } = useModal();
  const { open: openDesktopModal, close: closeDesktopModal } = useDesktopBasicModal();

  const spaceId = retrospect.spaceId;
  const retrospectId = retrospect.retrospectId;
  const isAnalyzed = ["DONE", "PROCEEDING"].includes(retrospect.analysisStatus);

  /**
   * @description 토글 메뉴 표시 함수
   * @param event - 클릭 이벤트
   */
  const handleShowToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    showMenu(event);
  };

  // TODO: 인터페이스 타입 구조 한번 더 다시 잡기 (추상화 하려고 했으나, 잘못된 타입 단언들로 인해 추상화 불가)
  // 대상 : handleCloseRetrospect, handleRemoveRetrospect

  /**
   * @description 회고 마감 함수
   */
  const handleCloseRetrospect = async () => {
    try {
      setProgress(true);
      await mutateCloseRetrospect({ spaceId: String(spaceId), retrospectId: retrospectId });
    } catch (e) {
    } finally {
      setProgress(false);
      closeConfirmModal();
    }
  };

  /**
   * @description 회고 삭제 함수
   */
  const handleRemoveRetrospect = async () => {
    try {
      setProgress(true);
      await mutateDeleteRetrospect({ spaceId: String(spaceId), retrospectId: String(retrospectId) });
    } catch (e) {
    } finally {
      setProgress(false);
      closeConfirmModal();
    }
  };

  // * 회고 카드 관리 메뉴의 경우, 스페이스 리더에게만 노출되도록 합니다.
  if (!isLeader) return null;

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
      onClick={handleShowToggleMenu}
    >
      <Icon
        id="space-item-more-icon"
        icon="ic_more"
        size={iconSize}
        css={css`
          cursor: pointer;
          margin-left: auto;
          color: ${DESIGN_TOKEN_COLOR[iconColor]};
        `}
      />
      {isShowMenu && (
        <ToggleMenu>
          <ToggleMenu.Button
            isShow={!isAnalyzed}
            onClick={() =>
              openConfirmModal({
                title: "회고를 마감할까요?",
                contents: "더 이상의 회고 수정이 불가해요",
                options: {
                  buttonText: ["취소", "마감"],
                  autoClose: false,
                },
                onConfirm: handleCloseRetrospect,
                onClose: close,
              })
            }
          >
            회고 마감
          </ToggleMenu.Button>
          <ToggleMenu.Button
            onClick={() => {
              openDesktopModal({
                title: "회고 수정",
                contents: (
                  <ModifyRetrospect
                    retrospectId={retrospect.retrospectId}
                    spaceId={retrospect.spaceId}
                    title={retrospect.title}
                    introduction={retrospect.introduction}
                    dueDate={retrospect.deadline ?? ""}
                    onClose={closeDesktopModal}
                    isAnalyzed={isAnalyzed}
                  />
                ),
                options: {
                  enableFooter: false,
                },
              });
            }}
          >
            회고 수정
          </ToggleMenu.Button>
          <ToggleMenu.Button
            variant="subtitle14SemiBold"
            color="red500"
            onClick={() =>
              openConfirmModal({
                title: "회고를 삭제하시겠어요?",
                contents: "삭제하면 다시 되돌릴 수 없어요",
                options: {
                  buttonText: ["취소", "삭제"],
                  autoClose: false,
                },
                onConfirm: handleRemoveRetrospect,
                onClose: close,
              })
            }
          >
            회고 삭제
          </ToggleMenu.Button>
        </ToggleMenu>
      )}
    </div>
  );
}

export function ModifyRetrospect(props: {
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
  dueDate: string;
  isAnalyzed: boolean;
  onClose: () => void;
}) {
  const { mutateAsync: editRetrospect, isPending } = usePatchRetrospect();
  const { value: title, handleInputChange: handleChangeTitle } = useInput(props.title);
  const { value: introduction, handleInputChange: handleChangeIntroduction } = useInput(props.introduction);
  const { value: dueDate, setValue: setDueDate } = useInput(props.dueDate);
  const [isChanged, setIsChanged] = useState(false);

  const isVisibleDueDate = !props.isAnalyzed && !!dueDate;
  const initialState = useRef({
    title: props.title,
    introduction: props.introduction,
    dueDate: props.dueDate,
  });

  const location = useLocation();

  const checkChanges = (e: React.FormEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (name === "title") {
      setIsChanged(value !== initialState.current.title);
    }
    if (name === "introduction") {
      setIsChanged(value !== initialState.current.introduction);
    }

    if (name === "due-date") {
      if (dueDate === null || dueDate === "") return;
      setIsChanged(value !== initialState.current.dueDate);
    }
  };

  const handleModifyRetrospect = async () => {
    const { status } = await editRetrospect({
      spaceId: props.spaceId,
      retrospectId: props.retrospectId,
      data: {
        title,
        introduction,
        deadline: dueDate,
      },
    });
    if (status === 200) {
      // 수정이 완료되면 기존 변경 체크 상태를 초기화하고, 초기 값을 최신 상태로 업데이트해줘요.
      setIsChanged(false);
      initialState.current = { title, introduction, dueDate };
      if (location.pathname === "/") {
        // 홈 화면에서 만약 수정을 할 경우에 모든 회고 목록을 invalidate 상태로 변경해줘요.
        await queryClient.invalidateQueries({
          queryKey: ["getAllRetrospects"],
        });
      }
    }
  };

  return (
    <section
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onChange={(e) => checkChanges(e)}
    >
      <Spacing size={2} />
      <InputLabelContainer id="title">
        <Label>회고 명</Label>
        <Input name="title" value={title} onChange={handleChangeTitle} maxLength={10} count placeholder="회고 이름을 적어주세요" />
      </InputLabelContainer>
      <Spacing size={3} />
      <InputLabelContainer id="introduction">
        <Label>한 줄 설명</Label>
        <TextArea
          name="introduction"
          value={introduction}
          onChange={handleChangeIntroduction}
          maxLength={20}
          count
          placeholder="회고에 대한 한 줄 설명을 적어주세요"
        />
      </InputLabelContainer>
      <Spacing size={3} />
      {isVisibleDueDate && (
        <InputLabelContainer id="due-date" css={{ position: "relative" }}>
          <Label>회고 마감일</Label>
          {/* DatePicker의 name 속성의 경우 하위 컴포넌트에서 관리되고 있어요 */}
          <DesktopDateTimeInput onValueChange={(value) => setDueDate(value ?? "")} defaultValue={dueDate} />
        </InputLabelContainer>
      )}
      <ButtonProvider
        sort="horizontal"
        onlyContainerStyle={{
          marginTop: "auto",
          paddingBottom: 0,
        }}
      >
        <ButtonProvider.Gray onClick={props.onClose}>취소</ButtonProvider.Gray>
        <ButtonProvider.Primary isProgress={isPending} disabled={isPending || !isChanged} onClick={handleModifyRetrospect}>
          완료
        </ButtonProvider.Primary>
      </ButtonProvider>
    </section>
  );
}
