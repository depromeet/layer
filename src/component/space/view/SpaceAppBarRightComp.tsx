import { css, keyframes } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useToast } from "@/hooks/useToast";

type RightCompProps = {
  spaceId: string | undefined;
  onDeleteClick: () => void;
  isTooltipVisible: boolean;
  onClickPlus: () => void;
  isLeader: boolean;
};

const slideUpDown = keyframes`
  0% {
    transform: translateY(-0.5rem);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-0.5rem);
  }
`;

export function SpaceAppBarRightComp({ spaceId, onDeleteClick, isTooltipVisible, onClickPlus, isLeader }: RightCompProps) {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  //const navigate = useNavigate();
  const { toast } = useToast();

  const handleModifyFun = () => {
    //navigate(`/space/modify/${spaceId}`);
    toast.success("아직 준비중인 단계에요!");
    setIsBoxVisible((prev) => !prev);
  };

  const toggleBoxVisibility = () => {
    setIsBoxVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsBoxVisible(false);
    }
  };

  useEffect(() => {
    if (isBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoxVisible]);

  return (
    <>
      <div
        css={css`
          display: flex;
          gap: 2.6rem;
          position: relative;
        `}
      >
        <div css={{ position: "relative" }}>
          <Icon icon="ic_plus" color={DESIGN_TOKEN_COLOR.gray00} size={1.8} onClick={onClickPlus} />
          {isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              css={css`
                position: absolute;
                top: 160%;
                right: -60%;
                transform: translateX(-50%);
                background-color: ${DESIGN_TOKEN_COLOR.blue600};
                padding: 1rem;
                padding-bottom: 1.2rem;
                border-radius: 0.5rem;
                white-space: nowrap;
                vertical-align: center;
                text-align: center;
                animation: ${slideUpDown} 3s infinite;

                ::after {
                  content: "";
                  position: absolute;
                  top: -0.5rem;
                  right: 1.5rem;
                  border-width: 0 0.5rem 0.5rem 0.5rem;
                  border-style: solid;
                  border-color: transparent transparent ${DESIGN_TOKEN_COLOR.blue600} transparent;
                }
              `}
            >
              <Typography variant="body12SemiBold" color="gray00">
                아이콘을 눌러 회고를 생성해보세요!
              </Typography>
            </motion.div>
          )}
        </div>
        <Icon icon="ic_3point" size={2} onClick={toggleBoxVisibility} />
        <AnimatePresence>
          {isBoxVisible && (
            <motion.div
              ref={boxRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              css={css`
                position: absolute;
                top: 150%;
                right: 0%;
                background-color: ${DESIGN_TOKEN_COLOR.gray00};
                border: 1px solid #ccc;
                border-radius: 1rem;
                box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
                z-index: 99;
                width: 16.5rem;
                height: auto;
                padding: 0.3rem 2rem;
              `}
            >
              {isLeader && (
                <button
                  onClick={handleModifyFun}
                  css={css`
                    display: block;
                    width: 100%;
                    padding: 1rem 0;
                    text-align: left;
                  `}
                >
                  <Typography variant="subtitle14SemiBold">스페이스 수정</Typography>
                </button>
              )}

              <button
                onClick={() => {
                  toggleBoxVisibility();
                  onDeleteClick();
                }}
                css={css`
                  display: block;
                  width: 100%;
                  padding: 1.3rem 0;
                  text-align: left;
                `}
              >
                <Typography variant="subtitle14SemiBold" color="red500">
                  {isLeader ? "스페이스 삭제" : "스페이스 떠나기"}
                </Typography>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
