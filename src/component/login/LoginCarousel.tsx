import { css } from "@emotion/react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@/component/common/typography";

function LoginCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <>
      <Slider {...settings}>
        {items.map((item, idx) => (
          <div
            key={idx}
            css={css`
              width: 100vw;
              height: calc(100vh - 28rem);
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
              <img src={item.imgSrc} css={css``} />
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
    content: "회고 템플릿 추천을 통해 \n나에게 맞는 회고 방법을 고르고",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5tMYku5GI0TB4BCjCF1Qd4S8BrRZp_7-GA&s",
  },
  {
    title: "간편한 회고 작성",
    content: "간편하게 회고를 작성해요!",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5tMYku5GI0TB4BCjCF1Qd4S8BrRZp_7-GA&s",
  },
  {
    title: "AI 회고분석",
    content: "작성된 회고 내용을\n 분석해줄게요",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5tMYku5GI0TB4BCjCF1Qd4S8BrRZp_7-GA&s",
  },
  {
    title: "실행목표 관리",
    content: "이제 나의 실행목표를 \n설정하고 관리해요!",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5tMYku5GI0TB4BCjCF1Qd4S8BrRZp_7-GA&s",
  },
];
