import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const questionArr = ["앱을 자주 사용하지 않아요", "앱 사용이 불편해요", "기타"];

export function UserDeletion() {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(questionArr.length).fill(false));
  const [feedback, setFeedback] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem("deletionModalShown", "false");
    setIsDisabled(!checkedItems.includes(true));
  }, [checkedItems]);

  const deleteComplete = () => {
    navigate(PATHS.myInfo(), {
      state: {
        showDeletionModal: true,
        booleans: checkedItems,
        description: feedback,
      },
    });
  };

  return (
    <DefaultLayout title="계정 탈퇴">
      <Spacing size={1.8} />
      <Typography variant="title16Bold">떠나신다니 아쉬워요</Typography>
      <Spacing size={1} />
      <Typography variant="body14Medium">
        계정을 삭제하려는 이유를 알려주시면 소중한 의견을 반영하여 더 나은 서비스를 제공하도록 하겠습니다!
      </Typography>
      <Spacing size={2.8} />

      <div>
        {questionArr.map((question, index) => (
          <label
            key={question}
            css={css`
              display: flex;
              align-items: center;
              margin-bottom: 1rem;
              cursor: pointer;
            `}
          >
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
              css={css`
                display: none;
              `}
            />
            <div
              css={css`
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 0.4rem;
                border: 0.2rem solid ${DESIGN_TOKEN_COLOR.blue600};
                background-color: ${checkedItems[index] ? DESIGN_TOKEN_COLOR.blue600 : "transparent"};
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 0.5rem;
                transition:
                  background-color 0.3s ease,
                  transform 0.2s ease;
                transform: ${checkedItems[index] ? "scale(1)" : "scale(0.9)"};
              `}
            >
              {checkedItems[index] && (
                <>
                  <Icon
                    icon="ic_check"
                    color={DESIGN_TOKEN_COLOR.gray00}
                    css={css`
                      opacity: ${checkedItems[index] ? "1" : "0"};
                      transition: opacity 0.3s ease;
                    `}
                  />
                </>
              )}
            </div>
            <Typography variant="body15Medium">{question}</Typography>
          </label>
        ))}
        <Spacing size={1.8} />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={"앱 이용 경험에 대해 자세한 내용을 남겨주시면 서비스 개선에 참고하겠습니다!"}
          css={css`
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
            width: 100%;
            height: 10rem;
            font-size: 1.5rem;
            padding: 1.4rem 1.6rem;
            border-radius: 1.2rem;
            box-sizing: border-box;
            line-height: 1.4;
            overflow-y: auto;
            white-space: pre-line;

            &::placeholder {
              color: ${DESIGN_TOKEN_COLOR.gray500};
            }
          `}
        />
      </div>
      <ButtonProvider>
        <Button disabled={isDisabled} onClick={deleteComplete}>
          계정 탈퇴
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
