import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { TagBox } from "@/component/home";
import { ExampleButton } from "@/component/template/ExampleButton.tsx";
import { PurposeBox } from "@/component/template/PurposeBox.tsx";
import { QuestionBox } from "@/component/template/QuestionBox.tsx";
import { TipBox } from "@/component/template/TipBox.tsx";
import { TemplateLayout } from "@/layout/TemplateLayout.tsx";

export function TemplatePage() {
  const appbarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isColliding, setIsColliding] = useState(false);

  const checkCollision = () => {
    if (appbarRef.current && contentRef.current) {
      const rect1 = appbarRef.current.getBoundingClientRect();
      const rect2 = contentRef.current.getBoundingClientRect();
      const isColliding = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
      setIsColliding(isColliding);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkCollision);
    window.addEventListener("resize", checkCollision);

    return () => {
      window.removeEventListener("scroll", checkCollision);
      window.removeEventListener("resize", checkCollision);
    };
  }, []);

  useEffect(() => {
    console.log(isColliding);
  }, [isColliding]);

  return (
    <TemplateLayout
      theme={isColliding ? "default" : "transparent"}
      LeftComp={
        <Icon
          icon={"ic_arrow_back_white"}
          css={css`
            path {
              fill: ${isColliding ? "#212329" : "fff"};
              transition: 0.4s all;
            }
          `}
        />
      }
      ref={appbarRef}
    >
      <section
        css={css`
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          row-gap: 6rem;
        `}
        ref={contentRef}
      >
        <article
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
          `}
        >
          <span
            id="title"
            css={css`
              font-size: 2.4rem;
              font-weight: 600;
            `}
          >
            감정 통찰을 위한 회고
          </span>
          <div
            css={css`
              div {
                width: fit-content;
              }
            `}
          >
            <TagBox tagName={"테스트"} />
          </div>
          <div
            id="description"
            css={css`
              color: #454952;
              line-height: 1.5;
            `}
          >
            MAD SAD GLAD 회고법은 구성원 스스로 어떤 감정을 가지고 있는지 고민할 수 있도록 돕고 서로 정서적인 경험을 공유하며 팀의 결속력을 높이는데
            유용해요.
          </div>
        </article>
        <article>
          <span
            css={css`
              color: #212329;
              font-weight: 600;
              font-size: 1.8rem;
            `}
          >
            이런 목적으로 사용하기 좋아요
          </span>
          <Spacing size={2} />
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.8rem;
              row-gap: 0.8rem;
              flex-wrap: wrap;
            `}
          >
            {/* FIXME: 데이터가 반복으로 들어가는 구간, 데이터 패칭 시 수정 */}
            <PurposeBox purpose={"팀워크 강화"} />
            <PurposeBox purpose={"팀워크 강화"} />
            <PurposeBox purpose={"김현도리 김현도리 김현도리"} />
            <PurposeBox purpose={"팀워크 강화"} />
            <PurposeBox purpose={"김현도리 김현도리 김현도리"} />
          </div>
        </article>
        <article>
          <span
            css={css`
              color: #212329;
              font-weight: 600;
              font-size: 1.8rem;
            `}
          >
            이런 목적으로 사용하기 좋아요
          </span>
          <Spacing size={2} />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 0.8rem;
            `}
          >
            {/* FIXME: 데이터가 반복으로 들어가는 구간, 데이터 패칭 시 수정 */}
            <QuestionBox
              index={1}
              title={"자유롭게 회고를 작성해주세요"}
              contents={
                "앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요."
              }
            />
            <QuestionBox
              index={2}
              title={"자유롭게 회고를 작성해주세요"}
              contents={
                "앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요."
              }
            />
            <QuestionBox
              index={3}
              title={"자유롭게 회고를 작성해주세요"}
              contents={
                "앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요.앞서 말했던 내용의 해결책에 대해서 작성해요. 이때, 다음 회고 때 판별이 가능하거나 당장 실행 가능한 것들을 고려해서 작성하는 것이 좋아요."
              }
            />
          </div>
        </article>
        <article
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
          `}
        >
          <span
            css={css`
              color: #212329;
              font-weight: 600;
              font-size: 1.8rem;
            `}
          >
            회고 작성 Tip
          </span>
          <TipBox
            title={"답변은 구체적으로!"}
            content={
              "MAD SAD GLAD 회고는 모든 작업 뒤에는 감정이 있다는 것을 상기하며 작업 지향적 회고에서 간과되는 근본적인 문제들을 드러낼 수 있게해요. 따라서 단순 감정 나열 보다는 왜 그런 감정을 느끼게 되었는지 구체적으로 작성하는게 중요해요. 사건의 배경을 설명하고 어떤 영향을 받았는지, 어떤 감정이 들었고 추후 생각하는 개선 방향이 있다면 제안하는 것도 큰 도움이 되어요. "
            }
          />
          <ExampleButton> MAD SAD GLAD 회고 예시 보기 </ExampleButton>
        </article>
      </section>
      <ButtonProvider>
        <Button>선택하기</Button>
      </ButtonProvider>
    </TemplateLayout>
  );
}
