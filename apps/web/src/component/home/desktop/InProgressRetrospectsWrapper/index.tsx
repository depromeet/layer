import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import InProgressRetrospectCard from "../InProgressRetrospectCard";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useGetAllRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";

// 테스트용 더미 데이터
const DUMMY_RETROSPECTS = [
  { id: 1, title: "중간발표 이후 회고", description: "중간발표 과정 및 팀의 커뮤니케이션 과정", createdAt: "2024.07.30 10:00", memberCount: 4 },
  { id: 2, title: "프로젝트 기획 회고", description: "기획 단계에서의 문제점 및 개선 방안 논의", createdAt: "2024.08.01 14:00", memberCount: 4 },
  { id: 3, title: "1차 스프린트 회고", description: "개발 과정에서의 기술적 어려움과 해결 과정", createdAt: "2024.08.05 16:00", memberCount: 4 },
  { id: 4, title: "디자인 시안 리뷰 회고", description: "디자인팀과 협업하며 발생한 이슈들", createdAt: "2024.08.10 11:00", memberCount: 4 },
];

export default function InProgressRetrospectsWrapper() {
  // * 작성중인 모든 회고 리스트 요청
  const { data: retrospects } = useGetAllRetrospects({
    select: (data) => data.retrospects.filter((retrospect) => retrospect.writeStatus === "PROCEEDING"),
  });

  return (
    <section
      css={css`
        margin-top: 3.2rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <Typography variant="body15Bold" color="gray800">
        작성중인 회고 ({retrospects?.length || 0})
      </Typography>

      {/* ---------- Swiper 컨테이너 ---------- */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={3}
        navigation
        css={css`
          margin-top: 1.6rem;
          width: 100%;
          position: relative;
          overflow-x: visible;
          overflow-y: hidden;

          /* 오른쪽 그라데이션 */
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 8rem;
            height: 100%;
            background: linear-gradient(to left, ${DESIGN_TOKEN_COLOR.gray100}, rgba(255, 255, 255, 0));
            z-index: 2;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          /* 왼쪽 그라데이션 */
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 8rem;
            height: 100%;
            background: linear-gradient(to right, ${DESIGN_TOKEN_COLOR.gray100}, rgba(255, 255, 255, 0));
            z-index: 2;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          /* 이전 버튼이 활성화되면 왼쪽 그라데이션 표시 */
          &:has(.swiper-button-prev:not(.swiper-button-disabled))::before {
            opacity: 1;
          }

          /* 다음 버튼이 비활성화되면 오른쪽 그라데이션 숨김 */
          &:has(.swiper-button-next.swiper-button-disabled)::after {
            opacity: 0;
          }

          .swiper-wrapper {
            align-items: stretch;
          }

          .swiper-slide {
            height: auto;
            display: flex;
          }

          .swiper-button-prev,
          .swiper-button-next {
            width: 4.8rem;
            height: 4.8rem;
            background: white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
            top: 65%;
            transform: translateY(-50%);
            z-index: 10;

            &::after {
              font-size: 1.6rem;
              font-weight: bold;
              color: ${DESIGN_TOKEN_COLOR.gray600};
            }

            &:hover {
              background: ${DESIGN_TOKEN_COLOR.gray100};
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            &.swiper-button-disabled {
              opacity: 0;
            }
          }

          .swiper-button-prev {
            left: 1.6rem;
          }

          .swiper-button-next {
            right: 1.6rem;
          }
        `}
      >
        {DUMMY_RETROSPECTS.map((retrospect) => (
          <SwiperSlide key={retrospect.id}>
            <InProgressRetrospectCard
              title={retrospect.title}
              description={retrospect.description}
              createdAt={retrospect.createdAt}
              memberCount={retrospect.memberCount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
