import { css } from "@emotion/react";
import Lottie from "lottie-react";
import { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import animationData1 from "@/assets/lottie/login/login_carousel_1.json";
import animationData2 from "@/assets/lottie/login/login_carousel_2.json";
import animationData3 from "@/assets/lottie/login/login_carousel_3.json";
import animationData4 from "@/assets/lottie/login/login_carousel_4.json";
import { Typography } from "@/component/common/typography";

function LoginCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4900,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };

  return (
    <>
      <Slider {...settings}>
        {items.map((item, idx) => (
          <div
            key={idx}
            css={css`
              width: 100vw;
              height: calc(100dvh - 28rem);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 100%;
              `}
            >
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                  gap: 1.2rem;
                `}
              >
                <Typography
                  variant="body12SemiBold"
                  css={css`
                    width: fit-content;
                    color: rgba(73, 80, 87, 1);
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.4rem;
                    background-color: rgba(241, 243, 245, 1);
                  `}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="title20Bold"
                  css={css`
                    white-space: pre-line;
                  `}
                >
                  {item.content}
                </Typography>
              </div>
              {activeSlide === idx && <Lottie animationData={item.animationData} loop={true} autoplay={true} style={{ height: 300, width: 300 }} />}
              <div />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export { LoginCarousel };

const items = [
  {
    title: "템플릿 추천",
    content: "나에게 맞는 회고 템플릿을 \n쉽고 빠르게 추천받아요",
    animationData: animationData1,
  },
  {
    title: "간편한 회고 작성",
    content: "편리한 회고 작성 환경에서\n나의 회고를 진행해요",
    animationData: animationData2,
  },
  {
    title: "AI 회고분석",
    content: "작성된 회고 내용을\n분석해 볼 수 있어요",
    animationData: animationData3,
  },
  {
    title: "실행목표 관리",
    content: "회고를 통한 실행목표를\n설정하고 관리해요!",
    animationData: animationData4,
  },
];
