import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from "@/config/storage-keys";
import Cookies from "js-cookie";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import Tooltip from "@/component/common/Tooltip";
import { Typography } from "@/component/common/typography";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { useGetActionItemList } from "@/hooks/api/actionItem/useGetActionItemList";
import { useGetPersonalActionItemList } from "@/hooks/api/actionItem/useGetPersonalActionItemList";
import { useTabs } from "@/hooks/useTabs";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ActionItemBox from "../ActionItemBox";

const GOAL_TAB_LABELS = ["팀", "개인"] as const;

const ONBOARDING_ITEMS = [
  {
    title: "4분기 회고",
    meta: "분기별 회고 | 회고 마감일 2024.12.21",
    actionItems: ["긴 회의시간 줄이기", "회의 후 내용 꼭 기록해두기", "'린 분석' 북 스터디 진행"],
  },
  {
    title: "중간 발표 이후 회고",
    meta: "기획 프로젝트 | 회고 마감일 2024.06.30",
    actionItems: ["추가 인터뷰 진행", "기능 범위 확정하기", "리스크 관리 플랜 설정하기"],
  },
] as const;

export default function ActionItemsWrapper() {
  const { tabs, curTab, selectTab } = useTabs(GOAL_TAB_LABELS);
  const memberId = Cookies.get(COOKIE_KEYS.memberId);
  const isTeamTab = curTab === "팀";
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // * 팀 탭: 내 모든 스페이스의 팀 실행목표 / 개인 탭: 내 모든 스페이스의 개인 실행목표
  const { data: teamGoals, isPending: isTeamPending } = useGetActionItemList({
    memberId: Number(memberId),
    options: { enabled: !!memberId && isTeamTab, select: (data) => data.actionItems },
  });
  const { data: personalGoals, isPending: isPersonalPending } = useGetPersonalActionItemList({
    options: { enabled: !!memberId && !isTeamTab, select: (data) => data.actionItems },
  });

  const currentGoals = isTeamTab ? teamGoals : personalGoals;
  const isPending = isTeamTab ? isTeamPending : isPersonalPending;
  const isEmptyGoals = !currentGoals || currentGoals.length === 0;

  const renderActionItems = () => {
    if (isPending) {
      return (
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
      );
    }

    if (isEmptyGoals) {
      return <ActionItemsWrapper.Onboarding />;
    }

    return currentGoals.map((actionItem, index) => (
      <SwiperSlide key={`${actionItem.retrospectId}-${index}`}>
        <ActionItemBox actionItem={actionItem} />
      </SwiperSlide>
    ));
  };

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
              background-color: ${DESIGN_TOKEN_COLOR.gray400};
              margin-left: 0.7rem;
            }
          `}
        >
          실행목표
        </Typography>
        <Typography variant="body15Medium" color="gray800">
          {currentGoals?.length ?? 0}개의 실행목표가 진행중이에요
        </Typography>
      </section>

      {/* ---------- 실행목표 컨텐츠 박스 ---------- */}
      <div
        css={css`
          position: relative;
          margin-top: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          overflow: hidden;
        `}
      >
        {/* ---------- 팀/개인 탭 + NEW 툴팁 ---------- */}
        <Tooltip placement="right" defaultOpen storageKey={LOCAL_STORAGE_KEYS.actionItemGoalTooltipSeen}>
          <Tooltip.Trigger>
            <div
              css={css`
                display: flex;
                gap: 0.4rem;
                width: fit-content;
              `}
            >
              {tabs.map((tab) => {
                const isActive = tab === curTab;
                return (
                  <button
                    key={tab}
                    onClick={() => selectTab(tab)}
                    css={css`
                      position: relative;
                      display: flex;
                      align-items: center;
                      padding: 0 0.4rem;
                      cursor: pointer;
                    `}
                  >
                    <Typography variant="subtitle18SemiBold" color={isActive ? "gray900" : "gray500"}>
                      {tab}
                    </Typography>
                    {/* 밑줄바는 absolute로 띄워 탭 블록 높이가 글자 높이와 같아지도록 한다 (툴팁 수직 정렬용) */}
                    <div
                      css={css`
                        position: absolute;
                        left: 0.4rem;
                        right: 0.4rem;
                        top: calc(100% + 0.8rem);
                        height: 0.2rem;
                        background-color: ${isActive ? DESIGN_TOKEN_COLOR.gray900 : "transparent"};
                      `}
                    />
                  </button>
                );
              })}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content tag="NEW" arrow>
            팀 회고 속 나의 목표를 관리해보세요.
          </Tooltip.Content>
        </Tooltip>

        {/* ---------- 카드 리스트 ---------- */}
        {/* 네비게이션 버튼은 Swiper(overflow: hidden) 밖에 두어야 음수 offset으로 가장자리까지 이동할 수 있다 */}
        <div
          css={css`
            position: relative;

            .swiper-button-prev,
            .swiper-button-next {
              width: 4.3rem;
              height: 4.3rem;
              background: ${DESIGN_TOKEN_COLOR.gray00};
              border-radius: 50%;
              box-shadow: 0px 0.3rem 0.5rem rgba(0, 0, 0, 0.08);
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;

              &::after {
                font-size: 1.4rem;
                font-weight: bold;
                color: ${DESIGN_TOKEN_COLOR.gray600};
              }

              &:hover {
                background: ${DESIGN_TOKEN_COLOR.gray100};
              }

              &.swiper-button-disabled {
                opacity: 0;
              }
            }

            .swiper-button-prev {
              left: -1.6rem;
            }

            .swiper-button-next {
              right: -1.6rem;
            }
          `}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            navigation={{ prevEl: prevButtonRef.current, nextEl: nextButtonRef.current }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation === "object" && swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevButtonRef.current;
                swiper.params.navigation.nextEl = nextButtonRef.current;
              }
            }}
            css={css`
              width: 100%;
              min-height: 22.8rem;

              .swiper-wrapper {
                display: ${isEmptyGoals ? "none" : "flex"};
                align-items: stretch;
              }

              .swiper-slide {
                height: auto;
                display: flex;
                align-items: flex-start;
              }
            `}
          >
            {renderActionItems()}
          </Swiper>
          <button ref={prevButtonRef} className="swiper-button-prev" />
          <button ref={nextButtonRef} className="swiper-button-next" />
        </div>
      </div>
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
      {ONBOARDING_ITEMS.map((item) => (
        <ActionItemsWrapper.OnboardingItem key={item.title} {...item} />
      ))}
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

ActionItemsWrapper.OnboardingItem = function ({
  title,
  meta,
  actionItems,
}: {
  title: string;
  meta: string;
  actionItems: readonly string[];
}) {
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
            {title}
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
            {meta}
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
        {actionItems.map((actionItem) => (
          <li
            key={actionItem}
            css={css`
              padding-left: 0.8rem;
            `}
          >
            <Typography variant="body16Medium" color="gray900">
              {actionItem}
            </Typography>
          </li>
        ))}
      </ul>
    </article>
  );
};
