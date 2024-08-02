import { css } from "@emotion/react";
import { useContext } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionItem } from "@/component/write/QuestionItem";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";
import "swiper/css";
import "@/style/swiper/swiper.css";

export function Prepare() {
  const { incrementPhase, data } = useContext(PhaseContext);

  return (
    <DefaultLayout theme={"dark"} LeftComp={<Icon icon={"ic_back_white"} />}>
      <Header title={`회고를\n작성해볼까요?`} contents={`총 ${data.questions.length}개의 질문으로 구성되어있어요`} theme={"white"} />
      <div
        id="container"
        css={css`
          flex: 1;
          width: 100%;
          position: relative;
          top: 50%;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 18%;
            height: 100%;
            width: 100%;
            max-height: 37rem;
            display: flex;
            align-items: center;
            overflow: hidden;
          `}
        >
          <div
            id="overlay"
            css={css`
              background: linear-gradient(180deg, rgba(33, 37, 41, 0) 0%, #212529 100%);
              position: absolute;
              width: 100%;
              height: 40%;
              top: -5%;
              z-index: 10000;
              transform: scale(1, -1);
            `}
          />
          <div
            id="overlay"
            css={css`
              background: linear-gradient(180deg, rgba(33, 37, 41, 0) 0%, #212529 100%);
              position: absolute;
              width: 100%;
              height: 60%;
              bottom: 0;
              z-index: 10000;
            `}
          />
          {/* NOTE: 추후 Flicking 캐러셀로 수정 */}
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            direction={"vertical"}
            modules={[Autoplay]}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            css={css`
              animation: ${ANIMATION.FADE_UP} 1s ease-in-out;
              height: 15rem;
              cursor: ns-resize;
            `}
          >
            {data?.questions.map((item) => {
              return (
                <SwiperSlide key={item.order + 1}>
                  <QuestionItem index={item.order + 1} contents={item.question} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <ButtonProvider>
        <Button colorSchema={"white"} onClick={incrementPhase}>
          시작하기
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
