import { css } from "@emotion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { TagBox } from "@/component/home";
import { ExampleButton } from "@/component/template/ExampleButton.tsx";
import { PurposeBox } from "@/component/template/PurposeBox.tsx";
import { QuestionBox } from "@/component/template/QuestionBox.tsx";
import { TipBox } from "@/component/template/TipBox.tsx";
import { useGetTemplateInfo } from "@/hooks/api/template/useGetTemplateInfo.ts";
import { TemplateLayout } from "@/layout/TemplateLayout.tsx";

export function TemplatePage() {
  const appbarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isColliding, setIsColliding] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId } = location?.state as { templateId: number };
  /**
   * template
   * - 10000 : KPT
   * - 10001 : 5F
   * - 10002 : Mad Sad Glad
   * - 10003 : SSC
   * - 10004 : PMI
   * - 10005 : 무제
   * */
  // const templateSet = [10000, 10001, 10002, 10003, 10004, 10005];
  const { data } = useGetTemplateInfo({ templateId: templateId });

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

  return (
    <Fragment>
      <TemplateLayout theme={isColliding ? "default" : "transparent"}>
        <TemplateLayout.Header
          LeftComp={
            <Icon
              icon={"ic_arrow_back_white"}
              css={css`
                path {
                  fill: ${isColliding ? "#212329" : "fff"};
                  transition: 0.4s all;
                }
              `}
              onClick={() => navigate(-1)}
            />
          }
          ref={appbarRef}
        >
          <img
            src={data?.templateImageUrl ?? ""}
            css={css`
              width: 20rem;
              height: auto;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          />
        </TemplateLayout.Header>
        <TemplateLayout.Main>
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
                {data?.title ?? ""}
              </span>
              <div
                css={css`
                  div {
                    width: fit-content;
                  }
                `}
              >
                <TagBox tagName={data?.templateName ?? ""} isSubstitution={false} />
              </div>
              <div
                id="description"
                css={css`
                  color: #454952;
                  line-height: 1.5;
                `}
              >
                {data?.introduction ?? ""}
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
                {data.templatePurposeResponseList.map((item) => {
                  return <PurposeBox key={item.id} purpose={item.purpose} />;
                })}
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
                {data?.templateDetailQuestionList.map((item, index) => {
                  return <QuestionBox key={item.questionId} index={index + 1} title={item.question} contents={item.description} />;
                })}
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
              <TipBox title={data?.tipTitle ?? ""} content={data?.tipDescription ?? ""} />
              <ExampleButton> {data?.templateName ?? ""} 회고 예시 보기 </ExampleButton>
            </article>
          </section>
          <ButtonProvider>
            <Button>선택하기</Button>
          </ButtonProvider>
        </TemplateLayout.Main>
      </TemplateLayout>
    </Fragment>
  );
}
