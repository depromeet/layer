import { Icon, IconType } from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import { SATISTFACTION_COLOR } from "@/component/write/template/template.const";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

const EMOTIONS: IconType[] = ["ic_very_poor", "ic_poor", "ic_commonly", "ic_good", "ic_very_good"];

const SatisfactionIdx = 3; // TODO: 실제 만족도 할당
const achievementPercentage = 78; // TODO: 실제 목표달성률 할당 (0-100 사이의 숫자)

const PADDING_SUM = 8;

export default function AnalysisIndividualContents() {
  return (
    <section
      css={css`
        width: 100%;
        height: 59rem;
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
        padding: 2rem 3.2rem;
      `}
    >
      {/* ---------- 진행상황 ---------- */}
      <article>
        {/* ---------- 제목 ---------- */}
        <section
          css={css`
            display: flex;
            gap: 0.7rem;
            margin-bottom: 1.2rem;
          `}
        >
          <Typography
            variant="body14Strong"
            color="gray800"
            css={css`
              display: flex;
              align-items: center;

              &::after {
                content: "";
                width: 0.1rem;
                height: 1.4rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray400};
                margin-left: 0.7rem;
              }
            `}
          >
            진행상황
          </Typography>
          <Typography variant="body14SemiBold" color="gray800">
            나는 진행사항에 대해 이렇게 생각해요!
          </Typography>
        </section>

        {/* ---------- 컨텐츠 ---------- */}
        <section
          css={css`
            width: 100%;
            height: 22rem;
            display: flex;
            flex-shrink: 0;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            padding: 2.4rem 2rem;
            gap: 2rem;
          `}
        >
          {/* ---------- 진행상황 만족도 ---------- */}
          <section
            css={css`
              flex: 1;
              height: 100%;
              display: flex;
              flex-direction: column;
              gap: 5rem;
              position: relative;

              /* ---------- 구분선 (Pseudo-element) ---------- */
              &::after {
                content: "";
                position: absolute;
                right: 0; /* 첫 번째 섹션의 오른쪽 끝에 배치 */
                top: 50%;
                transform: translateY(-50%) translateX(50%); /* 중앙으로 이동 */
                width: 1px;
                height: 100%; /* 전체 높이의 60% */
                background-color: ${DESIGN_TOKEN_COLOR.gray300};
              }
            `}
          >
            <div>
              <Typography variant="title18Bold" color="gray900">
                진행상황에 대해 대부분{" "}
              </Typography>
              {/* TODO: 실제 만족도 할당 */}
              <Typography variant="title18Bold" color="blue600">
                {"만족해요"}
              </Typography>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.2rem;
              `}
            >
              {EMOTIONS.map((item, index) => {
                return (
                  <div key={index}>
                    <Icon
                      icon={item}
                      size={5.2}
                      css={css`
                        circle,
                        ellipse {
                          fill: ${SatisfactionIdx === index && SATISTFACTION_COLOR[SatisfactionIdx]};
                          transition: 0.4s all;
                        }
                      `}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------- 목표달성률 ---------- */}
          <section
            css={css`
              flex: 1;
              height: 100%;
              display: flex;
              flex-direction: column;
              gap: 8rem;
            `}
          >
            <div>
              <Typography variant="title18Bold" color="gray900">
                목표달성률은{" "}
              </Typography>
              {/* TODO: 실제 목표달성률 할당 */}
              <Typography variant="title18Bold" color="blue600">
                {achievementPercentage}%
              </Typography>

              <Typography variant="title18Bold" color="gray900">
                에요
              </Typography>
            </div>

            {/* ---------- Progress bar ---------- */}
            <div
              css={css`
                position: relative;
                padding: 0 6rem;
              `}
            >
              {/* ---------- 말풍선 ---------- */}
              <div
                css={css`
                  position: absolute;
                  top: -5rem;
                  left: ${achievementPercentage - PADDING_SUM}%; /* 비율에 따라 동적 위치 */
                  transform: translateX(-50%); /* 중앙 정렬 */
                  background-color: white;
                  border-radius: 1.6rem;
                  padding: 0.4rem 0.8rem;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  display: flex;
                  align-items: center;
                  gap: 0.8rem;
                  z-index: 10;

                  /* ---------- 말풍선 꼬리 ---------- */
                  &::after {
                    content: "";
                    position: absolute;
                    bottom: -0.8rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 0.8rem solid transparent;
                    border-right: 0.8rem solid transparent;
                    border-top: 0.8rem solid white;
                  }
                `}
              >
                <Icon icon="ic_person" size={2.0} color={DESIGN_TOKEN_COLOR.blue600} />
                <Typography variant="title16Bold" color="gray900">
                  {achievementPercentage}%
                </Typography>
              </div>

              {/* ---------- 5구간 프로그레스 바 ---------- */}
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  gap: 0.46rem;
                  position: relative;
                `}
              >
                {[0, 1, 2, 3, 4].map((index) => {
                  // * 비율에 따라 각 구간의 채우기 정도 계산
                  const getSegmentFill = () => {
                    // 각 구간의 시작점 (0, 20, 40, 60, 80)
                    const segmentStart = index * 20;

                    // 각 구간의 끝점 (20, 40, 60, 80, 100)
                    const segmentEnd = (index + 1) * 20;

                    if (achievementPercentage <= segmentStart) {
                      return 0; // 비율이 구간 시작점보다 작으면 비움
                    } else if (achievementPercentage >= segmentEnd) {
                      return 1; // 비율이 구간 끝점보다 크면 완전히 채움
                    } else {
                      // 비율이 구간 내에 있으면 부분적으로 채움
                      return (achievementPercentage - segmentStart) / 20;
                    }
                  };

                  const fillRatio = getSegmentFill();
                  const isFirstSegment = index === 0;
                  const isLastSegment = index === 4;

                  return (
                    <div
                      key={index}
                      css={css`
                        flex: 1;
                        height: 3rem;
                        background-color: white;
                        border-radius: ${isFirstSegment ? "1.5rem 0 0 1.5rem" : isLastSegment ? "0 1.5rem 1.5rem 0" : "0"};
                        position: relative;
                        overflow: hidden;
                      `}
                    >
                      {/* ---------- 채워진 부분 ---------- */}
                      <div
                        css={css`
                          width: ${fillRatio * 100}%;
                          height: 100%;
                          background-color: #6b9eff;
                          border-radius: inherit;
                          transition: width 0.3s ease;
                        `}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ---------- 0% 텍스트 ---------- */}
              <span
                css={css`
                  position: absolute;
                  bottom: -2.5rem;
                  left: 6rem;
                  font-size: 1.2rem;
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                `}
              >
                0
              </span>

              {/* ---------- 100% 텍스트 ---------- */}
              <span
                css={css`
                  position: absolute;
                  bottom: -2.5rem;
                  right: 6rem;
                  font-size: 1.2rem;
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                `}
              >
                100
              </span>
            </div>
          </section>
        </section>
      </article>

      {/* ---------- 회고 ---------- */}
      <article>
        {/* ---------- 제목 ---------- */}
        <section
          css={css`
            display: flex;
            gap: 0.7rem;
            margin-bottom: 1.2rem;
          `}
        >
          <Typography
            variant="body14Strong"
            color="gray800"
            css={css`
              display: flex;
              align-items: center;

              &::after {
                content: "";
                width: 0.1rem;
                height: 1.4rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray400};
                margin-left: 0.7rem;
              }
            `}
          >
            회고
          </Typography>
          <Typography variant="body14SemiBold" color="gray800">
            나는 이렇게 회고하고 있어요!
          </Typography>
        </section>

        {/* ---------- 컨텐츠 ---------- */}
        <section
          css={css`
            width: 100%;
            height: 24rem;
            display: flex;
            flex-shrink: 0;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            padding: 2.4rem 2rem;
          `}
        >
          {/* ---------- 회고 내용 3개 컬럼 ---------- */}
          <div
            css={css`
              display: flex;
              gap: 2.4rem;
              width: 100%;
              height: 100%;
            `}
          >
            {/* ---------- 잘 하고 있어요 ---------- */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2rem;
                flex: 1;
              `}
            >
              <Typography variant="title16Bold" color="gray900">
                잘 하고 있어요
              </Typography>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.8rem;
                `}
              >
                {/* 긍정적 항목들 */}
                {["회의 내용 문서화", "꾸준한 글 작성", "적극적인 피드백"].map((item, index) => (
                  <div
                    key={index}
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 1.2rem;
                      height: 4.4rem;
                      padding: 1.2rem 1.6rem;
                      background-color: white;
                      border-radius: 0.8rem;
                    `}
                  >
                    <Icon icon="ic_good_mark" size={1.6} />
                    <Typography variant="subtitle14Bold" color="gray800">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- 이런 점은 부족해요 ---------- */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2rem;
                flex: 1;
              `}
            >
              <Typography variant="title16Bold" color="gray900">
                이런 점은 부족해요
              </Typography>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.8rem;
                `}
              >
                {/* 부족한 항목들 */}
                {["짧은 회의 늘어짐", "회의 시간 준수", "꾸준한 글 작성"].map((item, index) => (
                  <div
                    key={index}
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 1.2rem;
                      height: 4.4rem;
                      padding: 1.2rem 1.6rem;
                      background-color: white;
                      border-radius: 0.8rem;
                    `}
                  >
                    <Icon icon="ic_bad_mark_red" size={1.6} />
                    <Typography variant="subtitle14Bold" color="gray800">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- 개선이 필요해요 ---------- */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2rem;
                flex: 1;
              `}
            >
              <Typography variant="title16Bold" color="gray900">
                개선이 필요해요
              </Typography>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.8rem;
                `}
              >
                {/* 개선 필요 항목들 */}
                {["설득력 갖추기", "꾸준한 자기계발", "적극적인 피드백"].map((item, index) => (
                  <div
                    key={index}
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 1.2rem;
                      height: 4.4rem;
                      padding: 1.2rem 1.6rem;
                      background-color: white;
                      border-radius: 0.8rem;
                    `}
                  >
                    <Icon icon="ic_improve_blue_mark" size={1.6} />
                    <Typography variant="subtitle14Bold" color="gray800">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </section>
  );
}
