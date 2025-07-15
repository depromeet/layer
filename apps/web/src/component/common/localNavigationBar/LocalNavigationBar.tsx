import { css } from "@emotion/react";
import { useState } from "react";

import { Icon } from "../Icon";
import { Typography } from "../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const SPACE_TABS = ["전체", "개인", "팀"] as const;

export default function LocalNavigationBar() {
  const [currentTab, setCurrentTab] = useState<"전체" | "개인" | "팀">("전체");

  return (
    <aside
      css={css`
        position: fixed;
        top: 1.2rem;
        left: 1.2rem;
        width: 26rem;
        height: calc(100vh - 2.4rem);
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border-radius: 1.2rem;
      `}
    >
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.2rem 1.6rem 1.8rem 2rem;
          border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        `}
      >
        <Icon icon="ic_logo" size={6.36} style={{ cursor: "pointer" }} />
        <Icon icon="ic_arrow_back" size={1.35} style={{ cursor: "pointer" }} />
      </header>

      <nav
        css={css`
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        `}
      >
        {/* ---------- 홈 ---------- */}
        <ul
          css={css`
            list-style: none;
            margin: 0;
            padding: 0;
          `}
        >
          <li
            css={css`
              display: flex;
              align-items: center;
              gap: 1.6rem;
              padding: 0.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
              border-radius: 0.8rem;
              cursor: pointer;
            `}
          >
            <Icon icon="ic_home" size={1.35} style={{ cursor: "pointer" }} />
            <Typography variant="subtitle16SemiBold" color="gray900">
              홈
            </Typography>
          </li>
          <hr
            css={css`
              background-color: ${DESIGN_TOKEN_COLOR.gray200};
              border: none;
              height: 1px;
              margin: 0.8rem 0.4rem;
            `}
          />
        </ul>

        {/* ---------- 내 스페이스 ---------- */}
        <section
          css={css`
            margin-top: 1.6rem;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.4rem 0.4rem 0.4rem 0.8rem;
            `}
          >
            <Typography variant="subtitle16SemiBold" color="gray900">
              내 스페이스
            </Typography>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2.4rem;
                height: 2.4rem;
                padding: 0.3rem;
              `}
            >
              <Icon icon="ic_plus" size={1.6} />
            </div>
          </div>

          {/* ---------- 탭 (전체 / 개인 / 팀) ---------- */}
          <div
            css={css`
              display: flex;
              height: 4.4rem;
              margin: 0.4rem 0.4rem 0 0.4rem;
              gap: 1.2rem;
            `}
          >
            {SPACE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                css={css`
                  position: relative;
                  background: none;
                  border: none;
                  padding: 0.6rem 0rem;

                  &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: ${DESIGN_TOKEN_COLOR.gray900};
                    transform: scaleX(${tab === currentTab ? 1 : 0});
                    transition: transform 0.3s ease-in-out;
                    transform-origin: center;
                  }
                `}
              >
                <Typography variant="subtitle14SemiBold" color={tab === currentTab ? "gray900" : "gray500"}>
                  {tab}
                </Typography>
              </button>
            ))}
          </div>

          {/* ---------- 스페이스 리스트 (플레이스홀더) ---------- */}
          <ul
            css={css`
              margin-top: 1rem;
              padding: 0;
              list-style: none;
            `}
          >
            {/* Mock data */}
            <li
              css={css`
                display: flex;
                align-items: center;
                gap: 1rem;
                height: 5.6rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
                padding: 0.7rem 0.4rem;
                border-radius: 0.375rem;
                cursor: pointer;
              `}
            >
              <div
                css={css`
                  width: 3.6rem;
                  height: 3.6rem;
                  background-color: ${DESIGN_TOKEN_COLOR.gray200};
                  padding: 0.6rem;
                  border-radius: 50%;
                `}
              >
                <Icon icon="ic_management_white" size={2.4} />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.2rem;
                  flex: 0.9;
                  min-width: 0;
                `}
              >
                <Typography
                  variant="subtitle14SemiBold"
                  color="gray900"
                  css={css`
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                >
                  스페이스 이름 1
                </Typography>
                <Typography
                  variant="body12Medium"
                  color="gray600"
                  css={css`
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                >
                  스페이스 설명
                </Typography>
              </div>
            </li>
            <li
              css={css`
                display: flex;
                align-items: center;
                gap: 1rem;
                height: 5.6rem;
                /* background-color: ${DESIGN_TOKEN_COLOR.gray100}; */
                padding: 0.7rem 0.4rem;
                border-radius: 0.375rem;
                cursor: pointer;
              `}
            >
              <div
                css={css`
                  width: 3.6rem;
                  height: 3.6rem;
                  background-color: ${DESIGN_TOKEN_COLOR.gray200};
                  padding: 0.6rem;
                  border-radius: 50%;
                `}
              >
                <Icon icon="ic_management_white" size={2.4} />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.2rem;
                  flex: 0.9;
                  min-width: 0;
                `}
              >
                <Typography
                  variant="subtitle14SemiBold"
                  color="gray900"
                  css={css`
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                >
                  스페이스 이름 1이 너무 길어서 잘리는 경우
                </Typography>
                <Typography
                  variant="body12Medium"
                  color="gray600"
                  css={css`
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                >
                  스페이스 설명이 너무 길어서 잘리는 경우
                </Typography>
              </div>
            </li>
            <li
              css={css`
                display: flex;
                align-items: center;
                gap: 1.6rem;
                height: 5.6rem;
                padding: 0.7rem 1rem;
                border-radius: 0.375rem;
                cursor: pointer;
              `}
            >
              <div
                css={css`
                  width: 2.4rem;
                  height: 2.4rem;
                  background-color: ${DESIGN_TOKEN_COLOR.gray200};
                  padding: 0.5rem;
                  border-radius: 0.8rem;
                `}
              >
                <Icon icon="ic_plus" size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
              </div>
              <Typography variant="body14Medium" color="gray600">
                스페이스 추가
              </Typography>
            </li>
          </ul>
        </section>
      </nav>

      {/* ---------- 푸터: 사용자 정보 + 헬프 ---------- */}
      <footer
        css={css`
          border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
          padding: 0.6rem 2rem;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            width: 9.8rem;
            height: 3.6rem;
            gap: 1.2rem;
            padding: 0rem 0.4rem;
          `}
        >
          <Icon icon="basicProfile" size={2.4} />
          <Typography variant="body12Medium" color="gray700">
            {"홍길동"}
          </Typography>
        </div>
        <div
          css={css`
            width: 0.1rem;
            height: 1.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray200};
            margin: 0 0.8rem;
          `}
        />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3.6rem;
            gap: 0.6rem;
            padding: 0rem 1.6rem;
          `}
        >
          <Icon icon="ic_help" size={1.8} />
          <Typography variant="body12Medium" color="gray700">
            헬프 센터
          </Typography>
        </div>
      </footer>
    </aside>
  );
}
