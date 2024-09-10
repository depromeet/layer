import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiper.css";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

import { TemplateCard } from "@/component/retrospect/template/card/TemplateCard";

import { useNavigate } from "react-router-dom";

type CardCarouselProp = {
  spaceId: string;
  templateId: string;
  templateArr: {
    title: string;
    templateName: string;
    imageUrl: string;
  }[];
};

export function CardCarousel({ templateId, spaceId, templateArr }: CardCarouselProp) {
  const [isAnimating, setIsAnimating] = useState(false);
  const targetSlideIndex = 4; // 멈추고 싶은 n번째 슬라이드 인덱스 (0부터 시작)
  const navigate = useNavigate();

  const getSlideClassName = (index: number): string => {
    if (isAnimating && index === targetSlideIndex - 1) return "slide-content left";
    if (isAnimating && index === targetSlideIndex) return "slide-content animate";

    return "";
  };

  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={16}
      initialSlide={1}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      allowTouchMove={false}
      modules={[Autoplay]}
      onSlideChange={(swiper) => {
        if (swiper.activeIndex === targetSlideIndex) {
          swiper.autoplay.stop();
          setIsAnimating(true);
          setTimeout(() => {
            navigate("/retrospect/recommend/done", { state: { templateId, spaceId } });
          }, 2200);
        }
      }}
      onInit={(swiper) => {
        swiper.autoplay.start();
      }}
      className="card-carousel"
    >
      {templateArr.map((template, index) => (
        <SwiperSlide key={index} className={getSlideClassName(index)}>
          <TemplateCard name={template.templateName} tag={template.title} imgUrl={template.imageUrl} scale={0.8} size="small" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
