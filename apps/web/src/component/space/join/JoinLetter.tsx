import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type JoinLetterProps = {
  space: string;
  description: string;
  imgUrl: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function JoinLetter({ space, description, imgUrl, ...props }: JoinLetterProps) {
  const [_, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      css={css`
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ${ANIMATION.FADE_IN} 1.5s ease;

        #invite-card-top,
        #invite-card-bottom {
          position: relative;
        }

        #invite-card-bottom,
        #invite-card-content-backcover {
          height: 60%;
        }

        #invite-card-top {
          z-index: 1;
          top: 0.5rem;
        }

        #invite-card-content {
          z-index: 2;
          top: -10%;
          left: 0;
          right: 0;
          margin: 0 auto;
        }

        #invite-card-bottom {
          z-index: 3;
        }

        #invite-card-stamp {
          z-index: 4;
        }

        @keyframes slideUp {
          0% {
            transform: translateY(50%); /* 아래에서 시작 */
            clip-path: inset(0 0 50% 0);
          }
          100% {
            transform: translateY(0); /* 원래 위치로 */
            clip-path: inset(0 0 0% 0);
          }
        }
      `}
      {...props}
    >
      <div id="invite-card-top">
        <Icon icon={"letterTop"} size={30} />
      </div>
      <div
        id="invite-card-content"
        css={css`
          position: absolute;
          width: 90%;
          height: 30rem;
          border-radius: 0.7rem;
          background: white;
          box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow100};
          animation: slideUp ease 1s;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 10%;
              left: 50%;
              width: 100%;
              transform: translate(-50%, 0%);
              display: flex;
              flex-direction: column;
              align-items: center;
              row-gap: 1.6rem;
            `}
          >
            <img
              src={imgUrl}
              css={css`
                width: 6.8rem;
                height: 6.8rem;
                border-radius: 100%;
              `}
            />
            <Typography color={"gray900"} variant={"title18Bold"}>
              {space}
            </Typography>
            <Typography color={"gray600"} variant={"body12Medium"}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <div id="invite-card-bottom">
        <Icon icon={"letterBottom"} size={30} />
      </div>
      <div
        id="invite-card-content-backcover"
        css={css`
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          z-index: -1;
          background: ${DESIGN_TOKEN_COLOR.blue400};
        `}
      ></div>
      <div
        id="invite-card-stamp"
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
        `}
      >
        <Icon
          icon={"letterStamp"}
          size={6}
          css={css`
            margin: auto 1.7rem 1.4rem auto;
          `}
        />
      </div>
    </div>
  );
}
