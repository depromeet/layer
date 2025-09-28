import { css } from "@emotion/react";
import { useState } from "react";

import { Button } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { ProfileImage } from "@/component/common/ProfileImage";
import { TextArea } from "@/component/common/input";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ANIMATION } from "@/style/common/animation";
import { Input, InputLabelContainer, Label } from "@/component/common/input";
import { useInput } from "@/hooks/useInput";

type AccountSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AcountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  if (!isOpen) return null;

  const [modalView, setModalView] = useState<"settings" | "deleteAccount">("settings");
  const nameInput = useInput("홍길동");
  const [deleteReasons, setDeleteReasons] = useState({
    notUseful: false,
    uncomfortable: false,
    other: false,
  });
  const feedbackInput = useInput("");

  // 체크박스 중 하나라도 선택되었는지 확인
  const hasSelectedReason = Object.values(deleteReasons).some(Boolean);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(6, 8, 12, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        `}
        onClick={handleBackgroundClick}
      >
        <div
          css={css`
            width: 100%;
            max-width: 52rem;
            min-height: 80vh;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            border-radius: 1.2rem;
            box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            margin: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.3s ease-out;
          `}
        >
          {/* 헤더 */}
          <header
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 2.4rem;
            `}
          >
            <Typography variant="subtitle18SemiBold" color="gray900">
              {modalView === "settings" ? "계정 설정" : "계정 탈퇴"}
            </Typography>
            <button
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.2rem;
                height: 3.2rem;
                border: none;
                background: transparent;
                border-radius: 0.4rem;
                cursor: pointer;
                transition: background-color 0.2s ease;

                &:hover {
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                }
              `}
              onClick={onClose}
            >
              <Icon icon="ic_close" size={2.4} />
            </button>
          </header>

          {/* 콘텐츠 */}
          <div
            css={css`
              flex: 1;
              padding: 2.4rem;
              overflow-y: auto;
            `}
          >
            {modalView === "settings" ? (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 2.4rem;
                `}
              >
                {/* 프로필 섹션 */}
                <section>
                  <div
                    css={css`
                      display: flex;
                      justify-content: center;
                      margin-bottom: 2rem;
                    `}
                  >
                    <ProfileImage
                      size={12}
                      onCameraClick={() => {
                        console.log("프로필 이미지 변경");
                        // TODO: 이미지 업로드 로직 구현
                      }}
                    />
                  </div>
                  <InputLabelContainer id="name">
                    <Label>이름</Label>
                    <Input readOnly value={nameInput.value} onChange={nameInput.handleInputChange} placeholder="회고 이름을 적어주세요" />
                  </InputLabelContainer>
                </section>
              </div>
            ) : (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 2.4rem;
                `}
              >
                {/* 계정 탈퇴 콘텐츠 */}
                <section>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                    `}
                  >
                    <Typography
                      variant="title18Bold"
                      color="gray900"
                      css={css`
                        margin-bottom: 1.6rem;
                      `}
                    >
                      떠나신다니 아쉬워요
                    </Typography>
                    <Typography
                      variant="body15Medium"
                      color="gray700"
                      css={css`
                        margin-bottom: 2.4rem;
                        line-height: 1.5;
                      `}
                    >
                      계정을 삭제하는 이유를 알려주시면 소중한 의견을 반영하여 더 나은 서비스를 제공하도록 하겠습니다!
                    </Typography>
                  </div>

                  {/* 체크박스 옵션들 */}
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      gap: 1.6rem;
                      margin-bottom: 2.4rem;
                    `}
                  >
                    <label
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 0.8rem;
                        cursor: pointer;
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={deleteReasons.notUseful}
                        onChange={(e) => setDeleteReasons((prev) => ({ ...prev, notUseful: e.target.checked }))}
                        css={css`
                          width: 2rem;
                          height: 2rem;
                          cursor: pointer;
                        `}
                      />
                      <Typography variant="body14Medium" color="gray900">
                        앱을 자주 사용하지 않아요
                      </Typography>
                    </label>
                    <label
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 0.8rem;
                        cursor: pointer;
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={deleteReasons.uncomfortable}
                        onChange={(e) => setDeleteReasons((prev) => ({ ...prev, uncomfortable: e.target.checked }))}
                        css={css`
                          width: 2rem;
                          height: 2rem;
                          cursor: pointer;
                        `}
                      />
                      <Typography variant="body14Medium" color="gray900">
                        앱 사용이 불편해요
                      </Typography>
                    </label>
                    <label
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 0.8rem;
                        cursor: pointer;
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={deleteReasons.other}
                        onChange={(e) => setDeleteReasons((prev) => ({ ...prev, other: e.target.checked }))}
                        css={css`
                          width: 2rem;
                          height: 2rem;
                          cursor: pointer;
                        `}
                      />
                      <Typography variant="body14Medium" color="gray900">
                        기타
                      </Typography>
                    </label>
                  </div>

                  {/* 피드백 텍스트 에어리어 */}
                  <TextArea
                    value={feedbackInput.value}
                    onChange={feedbackInput.handleInputChange}
                    placeholder="앱 이용 경험에 대해 자세한 내용을 남겨주시면 서비스 개선에 참고하겠습니다!"
                    height="12rem"
                    css={css`
                      resize: vertical;
                    `}
                  />
                </section>
              </div>
            )}
          </div>

          {/* 푸터 버튼 */}
          <footer
            css={css`
              padding: 2.4rem;
            `}
          >
            {modalView === "settings" && (
              <div
                css={css`
                  margin-bottom: 1.4rem;
                  cursor: pointer;
                `}
                onClick={() => setModalView("deleteAccount")}
              >
                <Typography variant="body13Medium" color="gray700">
                  계정탈퇴
                </Typography>
              </div>
            )}
            <div
              css={css`
                display: flex;
                gap: 1.2rem;
              `}
            >
              <Button
                colorSchema="gray"
                css={css`
                  flex: 1;
                `}
                onClick={() => {
                  if (modalView === "deleteAccount") {
                    setModalView("settings");
                  } else {
                    onClose();
                  }
                }}
              >
                <Typography variant="subtitle16SemiBold" color="gray700">
                  {modalView === "deleteAccount" ? "취소" : "취소"}
                </Typography>
              </Button>
              <Button
                colorSchema={modalView === "deleteAccount" ? (hasSelectedReason ? "primary" : "gray") : "primary"}
                css={css`
                  flex: 1;
                `}
                onClick={() => {
                  if (modalView === "deleteAccount") {
                    // TODO: 계정 삭제 로직 구현
                    console.log("계정 삭제", { deleteReasons, feedback: feedbackInput.value });
                    onClose();
                  } else {
                    // TODO: 설정 저장 로직 구현
                    console.log("설정 저장");
                    onClose();
                  }
                }}
              >
                <Typography variant="subtitle16SemiBold" color={modalView === "deleteAccount" ? (hasSelectedReason ? "white" : "gray700") : "white"}>
                  {modalView === "deleteAccount" ? "계정 탈퇴" : "완료"}
                </Typography>
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </Portal>
  );
}
