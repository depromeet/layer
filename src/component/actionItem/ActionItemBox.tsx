import { css } from "@emotion/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { ActionItemList } from "@/component/actionItem/ActionItemList.tsx";
import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { TextArea } from "@/component/common/input";
import { SelectBox } from "@/component/common/SelectBox";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useCreateActionItem } from "@/hooks/api/actionItem/useCreateActionItem.ts";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { useInput } from "@/hooks/useInput.ts";
import { useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";

type ActionItemBoxProps = {
  id?: number;
  inProgressYn: boolean;
  title: string;
  contents: {
    actionItemId: number;
    content: string;
  }[];
  readonly?: boolean;
  description?: {
    team: string;
    completeDate: string;
  };
  retrospectInfo?: {
    retrospectId: number;
    retrospectTitle: string;
    status: "PROCEEDING" | "DONE";
  }[];
};
export default function ActionItemBox({ id, title, contents, inProgressYn, readonly, description, retrospectInfo = [] }: ActionItemBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const SHEET_ID = btoa(`ActionItemSheet${id}`);
  const hasContents = contents.length > 0;
  const showEmptyState = !hasContents && !inProgressYn;

  const menuRef = useRef<HTMLDivElement>(null);
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { value: actionItemValue, handleInputChange } = useInput();
  const [retrospect, setRetrospect] = useState("");
  const [retrospectId, setRetrospectId] = useState(id);
  const { mutate } = useCreateActionItem();
  const { toast } = useToast();
  const { open } = useModal();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsFading(true); // 사라지는 애니메이션 시작
        setTimeout(() => setIsVisible(false), 300); // 300ms 후에 메뉴를 숨김
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isVisible) {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsFading(false);
      setIsVisible(true);
    }
  };

  const updateRetroSpectData = ({ retrospectId, retrospectTitle }: { retrospectId: number; retrospectTitle: string }) => {
    setRetrospect(retrospectTitle);
    setRetrospectId(retrospectId);
  };

  return (
    <Fragment>
      <BottomSheet
        id={SHEET_ID}
        title={"실행 목표 추가"}
        sheetHeight={420}
        contents={
          <Fragment>
            <div
              css={css`
                padding: 2.4rem 1rem 0 1rem;
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
              `}
            >
              <SelectBox data={retrospectInfo} onClick={() => {}} value={retrospect} updateRetroSpectData={updateRetroSpectData} />
              <Spacing size={1.5} />
              <TextArea value={actionItemValue} onChange={handleInputChange} placeholder={"실행목표를 입력해주세요"} />
              <ButtonProvider
                onlyContainerStyle={css`
                  padding-bottom: 0;
                `}
              >
                <Button
                  onClick={() => {
                    mutate(
                      { retrospectId: retrospectId as number, content: actionItemValue },
                      {
                        onSuccess: () => {
                          closeBottomSheet();
                          setRetrospect("");
                          toast.success("성공적으로 실행목표가 추가되었어요!");
                        },
                        onError: () => {
                          toast.error("예기치못한 에러가 발생했어요");
                        },
                      },
                    );
                  }}
                  disabled={!actionItemValue}
                >
                  추가하기
                </Button>
              </ButtonProvider>
            </div>
          </Fragment>
        }
        onlyContentStyle={css`
          #content {
            margin: 0 -2rem;
          }
        `}
      />
      <div
        css={css`
          border-radius: 1.2rem;
          background: white;
          padding: 2rem;

          display: flex;
          flex-direction: column;
          box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            align-items: flex-start;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 0.8rem;
            `}
          >
            {inProgressYn && (
              <div
                css={css`
                  background: ${DESIGN_TOKEN_COLOR.blue100};
                  color: ${DESIGN_TOKEN_COLOR.blue600};
                  padding: 0.4rem 0.8rem;
                  width: fit-content;
                  border-radius: 0.4rem;
                `}
              >
                <Typography variant={"body12SemiBold"} color={"blue600"}>
                  진행 중
                </Typography>
              </div>
            )}
            <Typography variant={"title18Bold"}>{title}</Typography>
            {description && (
              <div
                id="description"
                css={css`
                  display: flex;
                  column-gap: 0.6rem;

                  span {
                    ${DESIGN_TOKEN_TEXT.body14Medium}
                    color: ${DESIGN_TOKEN_COLOR.gray500};
                  }

                  span:nth-of-type(2) {
                    color: ${DESIGN_TOKEN_COLOR.gray400};
                  }
                `}
              >
                <Typography>{description.team}</Typography>
                <Typography>|</Typography>
                <Typography>회고 완료일 {description.completeDate}</Typography>
              </div>
            )}
          </div>
          <div
            css={css`
              position: relative;
              margin-left: auto;
              display: flex;
              align-items: center;
              column-gap: 0.9rem;
            `}
          >
            {!readonly && hasContents && (
              <Icon
                icon={"ic_more"}
                size={2.3}
                onClick={handleClick}
                css={css`
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                `}
              />
            )}
            {!readonly && (
              <Icon
                icon={"ic_plus"}
                size={1.7}
                css={css`
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                `}
                onClick={() => {
                  openBottomSheet({ id: SHEET_ID });
                  setRetrospect(title);
                }}
              />
            )}
            {isVisible && (
              <div
                ref={menuRef}
                css={css`
                  visibility: ${isVisible};
                  position: absolute;
                  width: 16.5rem;
                  height: auto;
                  border-radius: 1.2rem;
                  background: ${DESIGN_TOKEN_COLOR.gray00};
                  box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
                  right: 50%;
                  top: 100%;

                  display: flex;
                  flex-direction: column;
                  padding: 1.3rem 2rem;
                  row-gap: 2.6rem;
                  animation: ${isFading ? ANIMATION.FADE_DOWN : ANIMATION.FADE_UP} ease 0.4s;

                  span {
                    cursor: pointer;
                  }
                `}
              >
                <Typography
                  variant={"subtitle14SemiBold"}
                  color={"gray800"}
                  onClick={() => {
                    open({
                      title: "현재 해당 기능은 준비중이에요",
                      contents: "빠르게 개발을 진행하고 있으니, 잠시만 기다려주세요!",
                      options: {
                        type: "alert",
                      },
                    });
                  }}
                >
                  실행목표 편집
                </Typography>
              </div>
            )}
          </div>
        </div>

        {hasContents && !showEmptyState && <Spacing size={2.5} />}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 2.4rem;
            padding: 0 0.4rem;
          `}
        >
          {hasContents
            ? contents.map((item, index) => <ActionItemList contents={item.content ?? ""} key={item.actionItemId ?? index} />)
            : !showEmptyState && (
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 1.6rem;
                    padding: 2.2rem 0;
                    cursor: pointer;
                  `}
                >
                  <Icon icon={"ic_fault_folder"} size={6.5} />
                  <Typography variant={"body14Medium"} color={"gray600"}>
                    실행 목표가 없어요
                  </Typography>
                </div>
              )}
        </div>
      </div>
    </Fragment>
  );
}
