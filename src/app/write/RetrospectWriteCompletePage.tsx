import { css, keyframes } from "@emotion/react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CompleteCheck, CompleteTitle } from "@/assets/imgs/template";
import confetti from "@/assets/lottie/template/confetti.json";
import { HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";

type UserInfoType = {
  isLogin: boolean;
  name: string;
  email: string;
  memberRole: string;
};

export function RetrospectWriteCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId, retrospectId } = location.state as { spaceId: number; retrospectId: number };

  const [isAnimation, setAnimation] = useState(false);
  const [userInfo, _] = useState(() => {
    const storedUserInfo = localStorage.getItem("auth");
    return storedUserInfo ? (JSON.parse(storedUserInfo) as UserInfoType) : null;
  });
  const CARD_ANIMATION = {
    FIRST_CARD: keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-8deg);
      }
  `,
    SECOND_CARD: keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-16deg);
      }
    `,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DefaultLayout
      theme={"transparent"}
      LeftComp={
        <Icon
          icon={"ic_arrow_left"}
          size={1.4}
          onClick={() =>
            navigate("/write", {
              state: {
                spaceId: spaceId,
                retrospectId: retrospectId,
              },
            })
          }
        />
      }
    >
      {!userInfo && <LoadingModal />}
      <HeaderProvider>
        {/*  FIXME: 추후 API 연동 후 닉네임 값이 들어와야해요 */}
        <HeaderProvider.Subject contents={`${userInfo ? userInfo.name : null}님의\n회고 작성이 완료되었어요!`} />
      </HeaderProvider>
      <div
        css={css`
          padding-top: 2.2rem;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            width: 40%;
            height: auto;
            aspect-ratio: 4 / 5.5;

            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: ${ANIMATION.FADE_IN} 0.8s ease-in-out;

            div {
              width: 100%;
              height: 100%;
              border-radius: 0.8rem;
              aspect-ratio: auto;
              position: absolute;
              transition: 0.4s all;
            }

            div:nth-of-type(1) {
              background-color: #2c3648;
              z-index: 3;
              position: relative;
            }

            div:nth-of-type(2) {
              background-color: #c4d7fd;
              z-index: 2;
              transform: rotate(-8deg);
              animation: ${CARD_ANIMATION.FIRST_CARD} 0.6s ease-in-out;
            }

            div:nth-of-type(3) {
              background-color: #a7c4fc;
              z-index: 1;
              transform: rotate(-16deg);
              animation: ${CARD_ANIMATION.SECOND_CARD} 0.8s ease-in-out;
            }
          `}
        >
          <div id="card-1">
            <CompleteCheck
              css={css`
                position: absolute;
                top: -7%;
                right: -7%;
                width: 25%;
                height: auto;
              `}
            />
            <CompleteTitle
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 70%;
                height: auto;
              `}
            />
          </div>
          <div id="card-2"></div>
          <div id="card-3"></div>
        </div>

        {isAnimation && (
          <Lottie
            animationData={confetti}
            loop={false}
            id="confetti"
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 80%;
              height: 80%;
              z-index: -1;
            `}
          />
        )}
      </div>
    </DefaultLayout>
  );
}
