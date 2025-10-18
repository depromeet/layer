import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { Header } from "@/component/common/header";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ANIMATION } from "@/style/common/animation";
import { QuestionItem } from "@/component/write";
import { Button, ButtonProvider } from "@/component/common/button";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@layer/shared";
import { useGetQuestions } from "@/hooks/api/write/useGetQuestions";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { retrospectWriteAtom } from "@/store/retrospect/retrospectWrite";
import { useSetAtom } from "jotai";

interface PrepareProps {
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
}

export function Prepare({ spaceId, retrospectId, title, introduction }: PrepareProps) {
  const { data, isLoading } = useGetQuestions({ spaceId: spaceId, retrospectId: retrospectId });
  const { closeFunnelModal } = useFunnelModal();
  const navigate = useNavigate();
  const { track } = useMixpanel();
  const setRetrospectWriteValue = useSetAtom(retrospectWriteAtom);

  const handSaveInfo = () => {
    setRetrospectWriteValue((prev) => ({
      ...prev,
      spaceId,
      retrospectId,
      title,
      introduction,
    }));
  };

  if (isLoading) return <LoadingModal purpose={"회고 작성을 위한 데이터를 가져오고 있어요"} />;

  return (
    <>
      <Header title={`회고를\n작성해볼까요?`} contents={`총 ${data ? data.questions.length : 0}개의 질문으로 구성되어있어요`} theme={"white"} />
      <div
        id="container"
        css={css`
          flex: 1;
          width: 100%;
          padding: 0 1.6rem;
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 7.2rem;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
          `}
        >
          <div
            id="overlay"
            css={css`
              background: linear-gradient(180deg, rgba(33, 37, 41, 0) 0%, #212329 100%);
              position: absolute;
              width: 100%;
              height: 40%;
              top: -10%;
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
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            direction={"vertical"}
            modules={[Autoplay]}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            css={css`
              animation: ${ANIMATION.FADE_UP} 1s ease-in-out;
              height: 18.8rem;
              cursor: ns-resize;
            `}
          >
            {data?.questions.map((item) => {
              return (
                <SwiperSlide key={item.order}>
                  <QuestionItem index={item.order} contents={item.question} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <ButtonProvider sort={"horizontal"}>
        <Button
          colorSchema={"white"}
          onClick={() => {
            closeFunnelModal();
            handSaveInfo();
            navigate(PATHS.retrospectWrite(String(spaceId), retrospectId, title, introduction));
            track("WRITE_START", {
              spaceId,
              retrospectId,
            });
          }}
        >
          선택하기
        </Button>
      </ButtonProvider>
    </>
  );
}
