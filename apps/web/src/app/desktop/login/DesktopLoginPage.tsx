import "swiper/css";
import "swiper/css/navigation";
import { Icon } from "@/component/common/Icon";
import { Navigation, Autoplay } from "swiper/modules";
import { ProgressBar } from "@/component/common/ProgressBar";
import { SocialLoginArea } from "@/component/login";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "@/component/common/typography";
import * as OnBoardingImage from "@/assets/imgs/onboarding";
import { useState } from "react";

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "맞춤 템플릿 추천",
    description: "나에게 맞는 회고 템플릿을\n쉽고 빠르게 추천받아요",
    image: "onboarding_1",
  },
  {
    id: 2,
    title: "회고 작성",
    description: "쉽고 직관적인 회고 작성 환경으로\n편리하게 회고에 몰입해요",
    image: "onboarding_2",
  },
  {
    id: 3,
    title: "회고 요약",
    description: "회고 내용이 한눈에 정리되어\n편리하게 회고 내용을 파악해요",
    image: "onboarding_3",
  },
  {
    id: 4,
    title: "AI 회고 분석",
    description: "AI가 회고 내용을 분석해\n요약 및 개선 방향성을 알려줘요",
    image: "onboarding_4",
  },
  {
    id: 5,
    title: "회고 스페이스",
    description: "회고 공간을 만들고 팀원을 초대해\n지속적으로 회고를 진행하고 관리해요",
    image: "onboarding_5",
  },
] as {
  id: number;
  title: string;
  description: string;
  image: keyof typeof OnBoardingImage;
}[];

function SwiperSlideOnboardingImage({
  title,
  description,
  ImageComponent,
}: {
  title: string;
  description: string;
  ImageComponent: React.ComponentType<any>;
}) {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        border-radius: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.2rem;
          align-items: center;
          text-align: center;
        `}
      >
        <Typography color="blue600" variant="body12SemiBold">
          {title}
        </Typography>
        <Typography
          color="gray900"
          variant="heading24Bold"
          css={css`
            white-space: pre-wrap;
          `}
        >
          {description}
        </Typography>
      </div>

      <div
        css={css`
          width: 90rem;
          max-width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 6.4rem;
        `}
      >
        <ImageComponent
          css={css`
            width: 100%;
            height: auto;
          `}
        />
      </div>
    </div>
  );
}

export default function DesktopLoginPage() {
  const [phase, setPhase] = useState(0);

  return (
    <main
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        column-gap: 5.6rem;
        width: 100dvw;
        height: 100dvh;
        box-sizing: border-box;
        min-width: 136rem;

        section {
          width: 100%;
          height: 100%;
        }

        & > section:nth-of-type(1) {
          flex: 0.7;
          min-width: 86rem;
        }
        & > section:nth-of-type(2) {
          flex: 0.3;
          min-width: 50rem;
        }
      `}
    >
      <section
        id="onboarding-section"
        css={css`
          padding: 5.2rem 0 11.4rem 8.8rem;
        `}
      >
        <div
          id="onboarding-form-wrapper"
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            id="progress-bar-wrapper"
            css={css`
              padding-bottom: 4.8rem;
              padding-inline: 5rem;
            `}
          >
            <ProgressBar
              curPage={phase + 1}
              lastPage={ONBOARDING_SLIDES.length}
              css={css`
                > div {
                  background-color: #06080c0a;
                }
              `}
            />
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setPhase(swiper.realIndex)}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            speed={800}
            loop={true}
            css={css`
              width: 100%;
              height: 100%;
              border-radius: 1.6rem;
              position: relative;
              overflow: hidden;

              .swiper-button-prev,
              .swiper-button-next {
                width: 3.2rem;
                height: 3.2rem;
                background: white;
                border-radius: 50%;
                border: 0.11rem solid ${DESIGN_TOKEN_COLOR.gray300};
                top: 60%;
                transform: translateY(-50%);
                z-index: 10;
                transition: all 0.4s;

                &::after {
                  font-size: 1.1rem;
                  font-weight: bold;
                  color: ${DESIGN_TOKEN_COLOR.gray600};
                }
              }

              .swiper-button-prev {
                left: 0.8rem;
              }

              .swiper-button-next {
                right: 0.8rem;
              }
            `}
          >
            {ONBOARDING_SLIDES.map((slide) => {
              const ImageComponent = OnBoardingImage[slide.image];

              return (
                <SwiperSlide key={slide.id}>
                  <SwiperSlideOnboardingImage title={slide.title} description={slide.description} ImageComponent={ImageComponent} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section
        id="login-section"
        css={css`
          padding: 2.4rem;
        `}
      >
        <div
          id="login-form-wrapper"
          css={css`
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 2rem;
            padding-inline: 8.2rem;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          `}
        >
          <Icon icon="ic_logo" size={8.7} />
          <span
            css={css`
              ${DESIGN_TOKEN_TEXT.heading24Bold}
              text-align: center;
              margin-top: 4.2rem;
              margin-bottom: 8rem;
            `}
          >
            회고 작성부터 AI 분석까지
            <br />
            성장을 위한 회고를 시작해보세요
          </span>
          <SocialLoginArea />
        </div>
      </section>
    </main>
  );
}
