import { css } from "@emotion/react";
import { Fragment, MouseEvent, useState } from "react";

import ActionItemBox from "@/component/actionItem/ActionItemBox.tsx";
import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { TextArea } from "@/component/common/input";
import { SelectBox } from "@/component/common/SelectBox";
import { Spacing } from "@/component/common/Spacing";
import { useBottomSheet } from "@/hooks/useBottomSheet.ts";
import { useInput } from "@/hooks/useInput.ts";
import { useModal } from "@/hooks/useModal.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function ActionItemMorePage() {
  const { open } = useModal();
  const { openBottomSheet } = useBottomSheet();
  const [retrospect, setRetrospect] = useState("");
  const { value: actionItemValue, handleInputChange } = useInput();
  const data = ["중간발표 이후 회고", "스프린트 2회차 이후"];
  const handleClick = (e: MouseEvent) => {
    setRetrospect(e.currentTarget.textContent as string);
  };

  return (
    <Fragment>
      <BottomSheet
        id={"ActionItemSheet"}
        title={"실행 목표"}
        contents={
          <Fragment>
            <div
              css={css`
                padding: 2.4rem 2rem 0 2rem;
              `}
            >
              <SelectBox data={data} onClick={handleClick} value={retrospect} />
              <Spacing size={1.5} />
              <TextArea value={actionItemValue} onChange={handleInputChange} placeholder={"실행목표를 입력해주세요"} />
              <Spacing size={2.3} />
              <ButtonProvider>
                <Button>추가하기</Button>
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
      <DefaultLayout
        theme={"gray"}
        title={"실행목표"}
        RightComp={
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 1.4rem;
            `}
          >
            <Icon
              icon={"ic_info_transparent"}
              size={2.5}
              onClick={() => {
                open({
                  title: "스페이스 대표자만\n실행 목표 설정이 가능해요",
                  contents:
                    "실행 목표는 회고 후 공동의 개선 목표를 \n 설정하는 공간이에요. 다음 회고까지의 \n 실행 목표를 팀원들과 함께 설정해보세요.",
                  options: {
                    type: "alert",
                  },
                });
              }}
            />
            <Icon icon={"ic_plus"} size={1.7} onClick={() => openBottomSheet({ id: "ActionItemSheet" })} />
          </div>
        }
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
            padding: 1.5rem 0;
          `}
        >
          <ActionItemBox inProgressYn={true} title={"스프린트 2회차 이후 회고"} contents={[]} />
          <ActionItemBox
            inProgressYn={false}
            title={"스프린트 2회차 이후 회고"}
            contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          />
          <ActionItemBox
            inProgressYn={false}
            title={"스프린트 3회차 이후 회고"}
            contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          />
          <ActionItemBox
            inProgressYn={false}
            title={"스프린트 4회차 이후 회고"}
            contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          />
          <ActionItemBox
            inProgressYn={false}
            title={"스프린트 5회차 이후 회고"}
            contents={["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "‘린 분석' 북 스터디 진행"]}
          />
        </div>
      </DefaultLayout>
    </Fragment>
  );
}
