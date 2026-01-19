import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ANIMATION } from "@/style/common/animation";
import { onboarding_home_1, onboarding_home_2, onboarding_home_3 } from "@/assets/imgs/onboarding-home";

const ONBOARDING_STEPS = [
  {
    title: "스페이스 생성하기",
    description: "회고를 모아둘 기본 공간을 만들어주세요.\n스페이스는 회고를 관리하고 저장하는 단위\n예요.",
    Image: onboarding_home_1,
  },
  {
    title: "회고 생성하기",
    description: "템플릿을 선택하고 회고를 시작해보세요.\n추천받기 기능을 사용하면 더 쉽게 선택할 수\n있어요.",
    Image: onboarding_home_2,
  },
  {
    title: "회고 작성 후 분석 내용 확인하기",
    description: "회고를 마치고 인사이트를 확인해보세요.\n작성한 내용을 바탕으로 AI가 실행목표와\n분석을 제공해요.",
    Image: onboarding_home_3,
  },
];

const ONBOARDING_STORAGE_KEY = "layer_home_onboarding_closed";

/**
 * 온보딩 닫기 기록 불러오기
 *
 * @returns Record<string, boolean>
 */
const getOnboardingClosedRecord = (): Record<string, boolean> => {
  const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

/**
 * 특정 사용자가 온보딩을 닫았는지 확인
 *
 * @param memberId
 * @returns boolean
 */
const hasUserClosedOnboarding = (memberId: string): boolean => {
  const record = getOnboardingClosedRecord();
  return record[memberId] === true;
};

/**
 * 특정 사용자의 온보딩 닫기 기록 저장
 *
 * @param memberId
 */
const saveOnboardingClosed = (memberId: string): void => {
  const record = getOnboardingClosedRecord();
  record[memberId] = true;
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(record));
};

export default function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const memberId = Cookies.get("memberId");

  const handleClose = () => {
    if (!memberId) return;

    saveOnboardingClosed(memberId);
    setIsVisible(false);
  };

  useEffect(() => {
    if (!memberId) {
      setIsVisible(false);
      return;
    }

    const shouldShowOnboarding = !hasUserClosedOnboarding(memberId);
    setIsVisible(shouldShowOnboarding);
  }, [memberId]);

  if (!isVisible) return null;

  return (
    <article
      css={css`
        width: 100%;
        background-color: ${DESIGN_TOKEN_COLOR.white};
        border-radius: 1.2rem;
        padding: 1.6rem 1.8rem;
        animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
        margin-top: 3.2rem;
      `}
    >
      <section
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        `}
      >
        <Typography
          variant="body15Bold"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
          `}
        >
          <Icon icon="ic_stars" size={1.8} />
          레이어가 처음이라면, 아래 단계대로 진행해보세요!
        </Typography>

        <button
          onClick={handleClose}
          css={css`
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.4rem;
            transition: background-color 0.2s ease;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
            }
          `}
        >
          <Icon icon="ic_quit" size={1.8} />
        </button>
      </section>

      <section
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        `}
      >
        {ONBOARDING_STEPS.map((step, index) => (
          <article
            key={index}
            css={css`
              max-width: 28.8rem;
              display: flex;
              flex-direction: column;
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
              border-radius: 1.6rem;
              padding: 0.8rem;
            `}
          >
            <section
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${DESIGN_TOKEN_COLOR.white};
                border-radius: 0.8rem 0.8rem 0 0;
                overflow: hidden;
              `}
            >
              <step.Image
                css={css`
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                `}
              />
            </section>

            <section
              css={css`
                padding: 2rem 1.6rem;
              `}
            >
              <section
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.6rem;
                  margin-bottom: 1.2rem;
                `}
              >
                <div
                  css={css`
                    width: 1.8rem;
                    height: 1.8rem;
                    border-radius: 50%;
                    background-color: ${DESIGN_TOKEN_COLOR.gray900};
                    color: ${DESIGN_TOKEN_COLOR.white};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  `}
                >
                  <Typography variant="caption10Bold" color="white">
                    {index + 1}
                  </Typography>
                </div>
                <Typography variant="body15Bold" color="gray900">
                  {step.title}
                </Typography>
              </section>

              <Typography
                variant="body14Medium"
                color="gray600"
                css={css`
                  white-space: pre-line;
                  line-height: 2rem;
                `}
              >
                {step.description}
              </Typography>
            </section>
          </article>
        ))}
      </section>
    </article>
  );
}
