import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { SocialLoginArea } from "@/component/login";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function DesktopLoginPage() {
  return (
    <main
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        column-gap: 5.6rem;
        width: 100dvw;
        height: 100dvh;
        box-sizing: border-box;

        section {
          width: 100%;
          height: 100%;
        }

        & > section:nth-of-type(1) {
          flex: 0.7;
        }
        & > section:nth-of-type(2) {
          flex: 0.3;
        }
      `}
    >
      <section
        id="onboarding-section"
        css={css`
          padding: 5.2rem 0 11.4rem 8.8rem;
        `}
      >
        <div
          id="onboarding-form-wrapper"
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            id="progress-bar-wrapper"
            css={css`
              padding-bottom: 4.8rem;
              padding-inline: 5rem;
            `}
          >
            <ProgressBar
              curPage={1}
              lastPage={4}
              css={css`
                > div {
                  background-color: #06080c0a;
                }
              `}
            />
          </div>
          {/* TODO: 디자인 팀에서 온보딩 화면 요청 받아 로직과 함께 넣는 과정이 필요해요 */}
          <div
            id="onboarding-picture"
            css={css`
              width: 100%;
              height: 100%;
              background-color: ${DESIGN_TOKEN_COLOR.gray200};
              border-radius: 2rem;
            `}
          />
        </div>
      </section>
      <section
        id="login-section"
        css={css`
          padding: 2.4rem;
        `}
      >
        <div
          id="login-form-wrapper"
          css={css`
            width: 48.5rem;
            height: 100%;
            background-color: white;
            border-radius: 2rem;
            padding-top: 24rem;
            padding-bottom: 22.1rem;
            padding-inline: 8.2rem;

            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <Icon icon="ic_logo" size={8.7} />
          <span
            css={css`
              ${DESIGN_TOKEN_TEXT.heading24Bold}
              text-align: center;
              margin-top: 4.2rem;
              margin-bottom: 8rem;
            `}
          >
            회고 작성부터 AI 분석까지
            <br />
            성장을 위한 회고를 시작해보세요
          </span>
          <SocialLoginArea />
        </div>
      </section>
    </main>
  );
}
