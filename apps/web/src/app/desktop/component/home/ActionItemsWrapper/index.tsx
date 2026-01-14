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
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";

const IS_ONBOARDING = true;
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
    <article
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
          {myActionItems?.length ?? 0}개의 실행목표가 진행 중이에요
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
            display: ${IS_ONBOARDING ? "none" : "block"};
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
        ) : !myActionItems || myActionItems.length === 0 ? (
          <ActionItemsWrapper.Onboarding />
        ) : (
          myActionItems?.map((actionItem, index) => (
            <SwiperSlide key={`${actionItem.retrospectId}-${index}`}>
              <ActionItemBox actionItem={actionItem} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </article>
  );
}

ActionItemsWrapper.Onboarding = function () {
  return (
    <section
      css={css`
        display: flex;
        gap: 2rem;
      `}
    >
      <ActionItemsWrapper.OnboardingHint />
      <ActionItemsWrapper.OnboardingItem />
      <ActionItemsWrapper.OnboardingItem />
    </section>
  );
};

ActionItemsWrapper.OnboardingHint = function () {
  return (
    <article
      css={css`
        display: flex;
        flex-direction: column;
        position: relative;
        width: 26.5rem;
        height: 22.8rem;
        padding-right: 2.4rem;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 0.1rem;
          height: 100%;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
        }
      `}
    >
      <Icon icon="ic_post" size={4.0} />
      <Spacing size={1.2} />
      <Typography variant="title16Bold" color="gray600">
        회고 진행하고 실행목표 확인하기
      </Typography>
      <Spacing size={1.2} />
      <Typography
        variant="body14Medium"
        color="gray500"
        css={css`
          word-break: keep-all;
        `}
      >
        Layer에서 회고를 작성하고 실행목표까지 만들어보세요. 회고를 완료하면 실행목표를 바로 확인할 수 있어요.
      </Typography>
    </article>
  );
};

ActionItemsWrapper.OnboardingItem = function () {
  return (
    <article
      css={css`
        width: 27.7rem;
        opacity: 0.3;
      `}
    >
      {/* ---------- 회고 제목 ---------- */}
      <section
        css={css`
          display: flex;
          align-items: center;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          padding: 1.6rem;
          border-radius: 0.8rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            flex: 1;
            min-width: 0;
          `}
        >
          <Typography variant="title16Bold" color="gray900">
            중간발표 이후 회고
          </Typography>
          <Typography
            variant="body14Medium"
            color="gray500"
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            떡잎방범대 | 회고 마감일 2026.06.30
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            flex-shrink: 0;
          `}
        >
          <Icon icon="ic_after" size={1.2} color={DESIGN_TOKEN_COLOR.gray800} />
        </div>
      </section>

      {/* ---------- 실행목표 리스트 ---------- */}
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 2.4rem;
          list-style: disc;
          padding-left: 2.6rem;
          margin-top: 2.4rem;
          gap: 2rem;

          li::marker {
            color: ${DESIGN_TOKEN_COLOR.gray400};
            font-size: 2rem;
          }
        `}
      >
        <li
          css={css`
            padding-left: 0.8rem;
          `}
        >
          <Typography variant="body16Medium" color="gray900">
            긴 회의 시간 줄이기
          </Typography>
        </li>
        <li
          css={css`
            padding-left: 0.8rem;
          `}
        >
          <Typography variant="body16Medium" color="gray900">
            회의 후 내용 꼭 기록해두기
          </Typography>
        </li>
      </ul>
    </article>
  );
};
