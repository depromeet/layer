import { Button, ButtonProvider } from "@/component/common/button";
import { TextArea } from "@/component/common/input";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import { useState } from "react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type ActionItemAddSectionProps = {
  onClose: () => void;
};

export default function ActionItemAddSection({ onClose }: ActionItemAddSectionProps) {
  const [selectedRetrospect, setSelectedRetrospect] = useState<string>("스프린트 1차 이후 회고");
  const [content, setContent] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const retrospectOptions = ["스프린트 1차 이후 회고", "스프린트 2차 이후 회고", "분기별 회고"];

  const handleRetrospectSelect = (option: string) => {
    setSelectedRetrospect(option);
    handleCloseDropdown();
  };

  const handleCloseDropdown = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, 200); // 애니메이션 시간과 맞춤
  };

  const handleToggleDropdown = () => {
    if (isDropdownOpen) {
      handleCloseDropdown();
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    onClose();
    setSelectedRetrospect("스프린트 1차 이후 회고");
    setContent("");
  };

  const handleComplete = () => {
    console.log("Selected retrospect:", selectedRetrospect);
    console.log("Content:", content);
  };

  return (
    <>
      <section
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
          padding: 0;
        `}
      >
        {/* ---------- 회고 선택 드롭다운 ---------- */}
        <article
          css={css`
            position: relative;
          `}
        >
          <section
            onClick={handleToggleDropdown}
            css={css`
              width: 100%;
              height: 5.3rem;
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
              border-radius: 0.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray00};
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1.6rem 1.4rem;
              cursor: pointer;
            `}
          >
            <Typography variant="body15Medium" color="gray800">
              {selectedRetrospect}
            </Typography>
            <Icon
              icon="ic_back"
              size={2}
              color={DESIGN_TOKEN_COLOR.gray700}
              css={css`
                transform: rotate(${isDropdownOpen ? "90deg" : "-90deg"});
                transition: transform 0.2s ease;
              `}
            />
          </section>

          {/* ---------- 드롭다운 메뉴 ---------- */}
          {isDropdownOpen && (
            <section
              css={css`
                position: absolute;
                top: calc(100% + 0.4rem);
                left: 0;
                right: 0;
                background-color: white;
                border-radius: 0.8rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 10;
                overflow: hidden;
                padding: 0.6rem 0;

                /* 열림/닫힘 애니메이션 효과 */
                animation: ${isClosing ? "dropdownClose" : "dropdownOpen"} 0.2s ease-out;
                transform-origin: top;

                @keyframes dropdownOpen {
                  from {
                    opacity: 0;
                    transform: scaleY(0.8) translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: scaleY(1) translateY(0);
                  }
                }

                @keyframes dropdownClose {
                  from {
                    opacity: 1;
                    transform: scaleY(1) translateY(0);
                  }
                  to {
                    opacity: 0;
                    transform: scaleY(0.8) translateY(-10px);
                  }
                }
              `}
            >
              {retrospectOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleRetrospectSelect(option)}
                  css={css`
                    align-content: center;
                    height: 4.2rem;
                    padding: 0.8rem 2rem;
                    cursor: pointer;

                    /* 순차적 애니메이션 효과 */
                    animation: ${isClosing ? "itemFadeOut" : "itemFadeIn"} 0.15s ease-out;
                    animation-delay: ${isClosing ? (retrospectOptions.length - index - 1) * 0.03 : index * 0.05}s;
                    animation-fill-mode: both;

                    @keyframes itemFadeIn {
                      from {
                        opacity: 0;
                        transform: translateY(-5px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }

                    @keyframes itemFadeOut {
                      from {
                        opacity: 1;
                        transform: translateY(0);
                      }
                      to {
                        opacity: 0;
                        transform: translateY(-5px);
                      }
                    }

                    &:hover {
                      background-color: ${DESIGN_TOKEN_COLOR.gray100};
                      transition: background-color 0.2s ease-in-out;
                    }
                  `}
                >
                  <Typography variant="body15Medium" color="gray800">
                    {option}
                  </Typography>
                </div>
              ))}
            </section>
          )}
        </article>

        {/* ---------- 실행목표 내용 입력 ----------*/}
        <article
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <TextArea
            value={content}
            placeholder="Text"
            height="14.3rem"
            onChange={handleContentChange}
            css={css`
              width: 100%;

              &::placeholder {
                color: ${DESIGN_TOKEN_COLOR.gray400};
              }

              &:focus {
                border-color: ${DESIGN_TOKEN_COLOR.blue500};
              }
            `}
          />
        </article>
      </section>

      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
          margin-top: 2.4rem;
          div:nth-of-type(1) {
            display: none;
          }
        `}
      >
        <Button colorSchema={"gray"} onClick={handleCancel}>
          취소
        </Button>
        <Button colorSchema={"primary"} onClick={handleComplete}>
          완료
        </Button>
      </ButtonProvider>
    </>
  );
}
