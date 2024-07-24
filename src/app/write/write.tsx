import { css } from "@emotion/react";
import { ChangeEvent, Fragment, useContext, useState } from "react";

import { PhaseContext } from "@/app/write/main.tsx";
import temp from "@/assets/temp.gif";
import { Button, ButtonProvider } from "@/component/common/button";
import { Confetti } from "@/component/common/Confetti";
import { HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { EntireListModal } from "@/component/write/EntireListModal.tsx";
import { ItemsButton } from "@/component/write/ItemsButton.tsx";
import { CAchievementTemplate } from "@/component/write/template/complete/Achievement.tsx";
import { CDescriptiveTemplate } from "@/component/write/template/complete/Descriptive.tsx";
import { CSatisfactionTemplate } from "@/component/write/template/complete/Satisfaction.tsx";
import { WAchievementTemplate } from "@/component/write/template/write/Achievement.tsx";
import { WDescriptiveTemplate } from "@/component/write/template/write/Descriptive.tsx";
import { WSatisfactionTemplate } from "@/component/write/template/write/Satisfaction.tsx";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";

export function Write() {
  // FIXME: 데이터 예시보고 상태 배열 관리 리팩토링 진행 (현재는 단일 문자열)
  const { incrementPhase, decrementPhase, phase, totalPhase } = useContext(PhaseContext);
  const [answer, setAnswer] = useState("");
  const [satisfyIdx, setSatistfyIdx] = useState(-1);
  const [archievementIdx, setArchievementIdx] = useState(-1);
  const [isOpen, setOpen] = useState(false);
  const list = [
    "진행상황에 대해 얼마나 만족하나요?",
    "목표했던 부분까지 얼마나 달성했나요?",
    "어려움을 느꼈던 부분은 무엇인가요?",
    "계속 유지하고 싶은 것은 무엇인가요?",
    "새롭게 시도해볼 내용은 무엇인가요?",
    "떡잎방범대의 디자이너들은 대단합니다",
    "떡잎방범대의 개발자들은 대단합니다",
    "떡잎방범대의 프로덕트는 대단합니다",
  ];

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleClick = (index: number, setIndex: (index: number) => void) => {
    setIndex(index);
  };

  const handleClickSatistfy = (index: number) => handleClick(index, setSatistfyIdx);
  const handleClickAchivement = (index: number) => handleClick(index, setArchievementIdx);

  const handleEntireListClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {isOpen && (
        <Portal id={"question-list-root"}>
          <EntireListModal listData={list} onClose={handleEntireListClose} />
        </Portal>
      )}
      <DefaultLayout
        title={<ItemsButton onClick={() => setOpen(true)} />}
        RightComp={
          <span
            css={css`
              color: #73a2ff;
            `}
          >
            마치기
          </span>
        }
        LeftComp={<Icon icon={"ic_back"} onClick={decrementPhase} />}
      >
        <div
          css={css`
            margin-top: 2rem;
            margin-bottom: 0.8rem;

            display: flex;
            flex-direction: column;
            row-gap: 0.8rem;
          `}
        >
          {/* Switch statement according to branch processing */}
          {/* FIXME: Will Modify DynamicRenderedComponent */}
          {
            {
              0: (
                <Fragment>
                  <HeaderProvider>
                    <HeaderProvider.Description
                      contents={"사전 질문"}
                      css={css`
                        color: #7e7c7c;
                      `}
                    />
                    <HeaderProvider.Subject contents={`진행상황에 대해\n얼마나 만족하나요?`} />
                  </HeaderProvider>
                  <div
                    css={css`
                      width: 100%;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    `}
                  >
                    <WSatisfactionTemplate index={satisfyIdx} onClick={handleClickSatistfy} />
                  </div>
                </Fragment>
              ),
              1: (
                <Fragment>
                  <HeaderProvider>
                    <HeaderProvider.Description
                      contents={"사전 질문"}
                      css={css`
                        color: #7e7c7c;
                      `}
                    />
                    <HeaderProvider.Subject contents={`목표했던 부분에\n얼마나 달성했나요?`} />
                  </HeaderProvider>
                  <div
                    css={css`
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      width: 100%;
                    `}
                  >
                    <WAchievementTemplate index={archievementIdx} onClick={handleClickAchivement} />
                  </div>
                </Fragment>
              ),
              2: (
                <Fragment>
                  <HeaderProvider>
                    <HeaderProvider.Description
                      contents={`${phase}/${totalPhase}`}
                      css={css`
                        color: #7e7c7c;
                      `}
                    />
                    <HeaderProvider.Subject contents={`진행상황에 대해 얼마나 만족하나요?`} />
                  </HeaderProvider>
                  <WDescriptiveTemplate answer={answer} onChange={handleChange} />
                </Fragment>
              ),
              3: (
                <Fragment>
                  <HeaderProvider>
                    <HeaderProvider.Subject contents={`중간발표 이후 회고`} />
                    <HeaderProvider.Description
                      contents={`방향성 체크 및 팀 내 개선점 구축`}
                      css={css`
                        color: #7e7c7c;
                      `}
                    />
                  </HeaderProvider>
                  <CSatisfactionTemplate index={satisfyIdx} question={"진행상황에 대해 얼마나 만족하나요?"} />
                  <CAchievementTemplate index={archievementIdx} question={"목표했던 부분에 얼마나 달성했나요?"} />
                  <CDescriptiveTemplate question={"계속 유지하고 싶은 것은 무엇인가요?"} answer={answer} />
                </Fragment>
              ),
              4: (
                <Fragment>
                  <HeaderProvider>
                    <HeaderProvider.Subject contents={`디프만님의\n회고 작성이 완료되었어요!`} />
                  </HeaderProvider>
                  <img
                    src={temp}
                    css={css`
                      position: absolute;
                      top: 45%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      width: 80%;
                      height: auto;
                      animation: ${ANIMATION.FADE_IN} 0.8s ease-in-out;
                    `}
                  />
                  <Confetti />
                </Fragment>
              ),
            }[phase]
          }
        </div>

        <ButtonProvider sort={"horizontal"}>
          <Button colorSchema={"gray"} onClick={decrementPhase}>
            이전
          </Button>
          <Button colorSchema={"primary"} onClick={incrementPhase}>
            다음
          </Button>
        </ButtonProvider>
      </DefaultLayout>
    </Fragment>
  );
}
