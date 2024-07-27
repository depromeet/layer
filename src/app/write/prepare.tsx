import { css } from "@emotion/react";
import { useContext } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PhaseContext } from "@/app/write/main.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { QuestionItem } from "@/component/write/QuestionItem.tsx";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";
import "swiper/css";
import "@/style/swiper/swiper.css";

export function Prepare() {
  const { incrementPhase } = useContext(PhaseContext);
  return (
    <DefaultLayout theme={"dark"} LeftComp={<Icon icon={"ic_back_white"} />}>
      <Header title={`회고를\n작성해볼까요?`} contents={"총 9개의 질문으로 구성되어있어요"} theme={"white"} />
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
            top: 25%;
            height: 100%;
            width: 100%;
            max-height: 37rem;
            display: flex;
            align-items: flex-start;
            overflow: hidden;
          `}
        >
          <div
            id="overlay"
            css={css`
              background: linear-gradient(180deg, rgba(33, 37, 41, 0) 0%, #212529 100%);
              position: absolute;
              width: 100%;
              height: 70%;
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
            loop={false}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            css={css`
              animation: ${ANIMATION.FADE_UP} 1s ease-in-out;
              height: 14rem;
              cursor: ns-resize;
            `}
          >
            <SwiperSlide>
              <QuestionItem index={1} contents={"진행상황에 대해 얼마나 만족하나요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={2} contents={"목표했던 부분까지 얼마나 달성했나요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={3} contents={"어려움을 느꼈던 부분은 무엇인가요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={4} contents={"계속 유지하고 싶은 것은 무엇인가요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={5} contents={"새롭게 시도해볼 내용은 무엇인가요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={6} contents={"오늘의 액션 아이템은 무엇인가요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={7} contents={"다음 목표는 무엇인가요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={8} contents={"성장을 요하던 순간은 언제였나요?"} />
            </SwiperSlide>
            <SwiperSlide>
              <QuestionItem index={9} contents={"무엇이 부족했나요?"} />
            </SwiperSlide>
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
