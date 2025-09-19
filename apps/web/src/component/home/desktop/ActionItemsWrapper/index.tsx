import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import ActionItemBox from "../ActionItemBox";
import Cookies from "js-cookie";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useGetActionItemList } from "@/hooks/api/actionItem/useGetActionItemList";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export default function ActionItemsWrapper() {
  // * 본인 memberId 가져오기
  const memberId = Cookies.get("memberId");

  // * 실행목표 리스트 요청
  const { data: myActionItems, isPending: isMyActionItemsPending } = useGetActionItemList({
    memberId: memberId as string,
    options: {
      enabled: !!memberId,
      select: (data) => data.actionItems,
    },
  });

  return (
    <section
      css={css`
        margin-top: 4.8rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        id="action-item-title"
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.7rem;
        `}
      >
        <Typography
          variant="body15Bold"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;

            &::after {
              content: "";
              width: 0.1rem;
              height: 0.9rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-left: 0.7rem;
            }
          `}
        >
          실행목표
        </Typography>
        <Typography variant="body15SemiBold" color="gray800">
          {myActionItems?.length ?? 0}개의 실행목표가 진행중이에요
        </Typography>
      </section>

      {/* ---------- 실행목표 컨텐츠 ---------- */}

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
        navigation
        css={css`
          height: 27.6rem;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          position: relative;
          overflow: hidden;

          /* 좌측 오버플로우 가리기 */
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 3.2rem;
            height: 100%;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            z-index: 5;
            pointer-events: none;
          }

          /* 우측 오버플로우 가리기 */
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 3.2rem;
            height: 100%;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            z-index: 5;
            pointer-events: none;
          }

          .swiper-wrapper {
            align-items: stretch;
          }

          .swiper-slide {
            height: auto;
            display: flex;
            align-items: flex-start;
          }

          .swiper-button-prev,
          .swiper-button-next {
            width: 4.8rem;
            height: 4.8rem;
            background: white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
            top: 60%;
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
            left: 0.8rem;
          }

          .swiper-button-next {
            right: 0.8rem;
          }
        `}
      >
        {isMyActionItemsPending ? (
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <LoadingSpinner />
          </div>
        ) : myActionItems?.length === 0 ? (
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              gap: 1.6rem;
            `}
          >
            <Typography variant="body14Medium" color="gray700">
              아직 작성된 실행목표가 없어요
            </Typography>
            <Typography variant="body12Medium" color="gray700">
              회고를 완료하면 실행목표를 설정할 수 있습니다
            </Typography>
          </div>
        ) : (
          myActionItems?.map((actionItem, index) => (
            <SwiperSlide key={`${actionItem.retrospectId}-${index}`}>
              <ActionItemBox actionItem={actionItem} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
