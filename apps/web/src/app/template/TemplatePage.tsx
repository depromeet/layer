import { css } from "@emotion/react";
import { Fragment, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { PurposeBox } from "@/component/template/PurposeBox.tsx";
import { QuestionBox } from "@/component/template/QuestionBox.tsx";
import { TemplateLottiePicture } from "@/component/template/TemplateLottiePicture.tsx";
import { TipBox } from "@/component/template/TipBox.tsx";
import { PATHS } from "@layer/shared";
import { useGetTemplateInfo } from "@/hooks/api/template/useGetTemplateInfo.ts";
import { useCollisionDetection } from "@/hooks/useCollisionDetection.ts";
import { TemplateLayout } from "@/layout/TemplateLayout.tsx";
import { formatOnlyDate } from "@/utils/date";

export function TemplatePage() {
  const appbarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId, spaceId, readOnly = true } = location?.state as { templateId: number; spaceId: number; readOnly: boolean };

  /**
   * template
   * - 10000 : KPT
   * - 10001 : 5F
   * - 10002 : Mad Sad Glad
   * - 10003 : SSC
   * - 10004 : PMI
   * - 10005 : 무제
   * */
  const templateSet = [10000, 10001, 10002, 10003, 10004, 10005];
  const isProvidedTemplateSet = templateSet.includes(templateId);
  const { data } = useGetTemplateInfo({ templateId: templateId });
  const isColliding = useCollisionDetection(appbarRef, contentRef);
  return (
    <Fragment>
      <TemplateLayout
        theme={isColliding ? "default" : "transparent"}
        isOnlyTemplateStyle={
          !isProvidedTemplateSet &&
          css`
          #header {
              min-height: var(--app-bar-height);
              background-color: transparent;
        `
        }
      >
        <TemplateLayout.Header
          LeftComp={
            <Icon
              icon={"ic_arrow_back_white"}
              css={css`
                path {
                  fill: #212329;
                  transition: 0.4s all;
                }
              `}
              onClick={() => navigate(-1)}
            />
          }
          // FIXME: 플로우 수정되면 미트볼 메뉴 추가
          // RightComp={isProvidedTemplateSet || readOnly ? null : <Icon icon={"ic_more"} size={2.1} />}
          ref={appbarRef}
        >
          <div
            css={css`
              width: 25rem;
              height: auto;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <TemplateLottiePicture templateId={templateId} />
          </div>
        </TemplateLayout.Header>
        <TemplateLayout.Main>
          <section
            css={css`
              padding: 2rem 0;
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
                <Tag>{data?.templateName ?? ""}</Tag>
              </div>
              {!isProvidedTemplateSet && (
                <Typography color={"gray500"} variant={"body14Medium"}>
                  {formatOnlyDate(data?.createdAt)}
                </Typography>
              )}
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
            {data?.templatePurposeResponseList?.length > 0 && (
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
            )}
            {data?.templateDetailQuestionList?.length > 0 && (
              <article>
                <span
                  css={css`
                    color: #212329;
                    font-weight: 600;
                    font-size: 1.8rem;
                  `}
                >
                  회고 질문은 이렇게 구성되어 있어요
                </span>
                <Spacing size={2} />
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    row-gap: 0.8rem;
                  `}
                >
                  {data?.templateDetailQuestionList.map((item, index) => {
                    return (
                      <QuestionBox
                        key={item.questionId}
                        index={index + 1}
                        title={item.question}
                        contents={item.description}
                        isProvidedTemplateSet={isProvidedTemplateSet}
                      />
                    );
                  })}
                </div>
              </article>
            )}
            <article
              css={css`
                display: flex;
                flex-direction: column;
                row-gap: 1.2rem;
              `}
            >
              {data?.tipTitle && data?.tipDescription && (
                <Fragment>
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
                </Fragment>
              )}
              {/* FIXME: 추후 회고 예시 버튼 추가 */}
              {/*<ExampleButton> {data?.templateName ?? ""} 회고 예시 보기 </ExampleButton>*/}
            </article>
          </section>
          {!readOnly && (
            <ButtonProvider>
              <Button
                onClick={() => {
                  navigate(PATHS.retrospectRecommendDone(), {
                    state: { spaceId, templateId },
                  });
                }}
              >
                선택하기
              </Button>
            </ButtonProvider>
          )}
        </TemplateLayout.Main>
      </TemplateLayout>
    </Fragment>
  );
}
