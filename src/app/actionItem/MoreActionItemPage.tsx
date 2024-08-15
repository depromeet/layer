import { css } from "@emotion/react";
import { Fragment } from "react";

import ActionItemBox from "@/component/actionItem/ActionItemBox.tsx";
import { Icon } from "@/component/common/Icon";
import { Modal } from "@/component/common/Modal";
import { useModal } from "@/hooks/useModal.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function MoreActionItemPage() {
  const { open } = useModal();

  return (
    <Fragment>
      <Modal />
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
            <Icon icon={"ic_plus"} size={1.7} />
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
