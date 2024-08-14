import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import { ActionItemList } from "@/component/actionItem/ActionItemList.tsx";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { ANIMATION } from "@/style/common/animation.ts";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type ActionItemBoxProps = {
  inProgressYn: boolean;
  title: string;
  contents: string[];
};
export default function ActionItemBox({ title, contents, inProgressYn }: ActionItemBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsFading(true); // 사라지는 애니메이션 시작
        setTimeout(() => setIsVisible(false), 300); // 300ms 후에 메뉴를 숨김
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isVisible) {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsFading(false);
      setIsVisible(true);
    }
  };

  return (
    <div
      css={css`
        border-radius: 1.2rem;
        background: white;
        padding: 2rem;

        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: flex-start;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.8rem;
          `}
        >
          {inProgressYn && (
            <div
              css={css`
                background: ${DESIGN_TOKEN_COLOR.blue100};
                color: ${DESIGN_TOKEN_COLOR.blue600};
                padding: 0.4rem 0.8rem;
                width: fit-content;
                border-radius: 0.4rem;
              `}
            >
              <Typography variant={"body12SemiBold"} color={"blue600"}>
                진행 중
              </Typography>
            </div>
          )}
          <Typography variant={"title18Bold"}>{title}</Typography>
        </div>
        <div
          css={css`
            position: relative;
            margin-left: auto;
          `}
        >
          <Icon icon={"ic_more"} size={2.5} onClick={handleClick} />
          {isVisible && (
            <div
              ref={menuRef}
              css={css`
                visibility: ${isVisible};
                position: absolute;
                width: 16.5rem;
                height: auto;
                border-radius: 1.2rem;
                background: ${DESIGN_TOKEN_COLOR.gray00};
                box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
                right: 0;

                display: flex;
                flex-direction: column;
                padding: 1.3rem 2rem;
                row-gap: 2.6rem;
                animation: ${isFading ? ANIMATION.FADE_DOWN : ANIMATION.FADE_UP} ease 0.4s;

                span {
                  cursor: pointer;
                }
              `}
            >
              <Typography variant={"subtitle14SemiBold"} color={"gray800"}>
                실행목표 편집
              </Typography>
              <Typography variant={"subtitle14SemiBold"} color={"red500"}>
                실행목표 삭제
              </Typography>
            </div>
          )}
        </div>
      </div>

      <Spacing size={2.8} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 2.4rem;
          padding: 0 0.4rem;
        `}
      >
        {contents.map((item, index) => (
          <ActionItemList contents={item} key={index} />
        ))}
      </div>
    </div>
  );
}
