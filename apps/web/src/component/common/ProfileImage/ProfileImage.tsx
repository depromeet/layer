import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type ProfileImageProps = {
  src?: string;
  alt?: string;
  size?: number;
  onCameraClick?: () => void;
  showCameraButton?: boolean;
};

export function ProfileImage({ src, alt = "프로필 이미지", size = 8, onCameraClick, showCameraButton = true }: ProfileImageProps) {
  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
      `}
    >
      {/* 프로필 이미지 원형 컨테이너 */}
      <div
        css={css`
          width: ${size}rem;
          height: ${size}rem;
          border-radius: 50%;
          overflow: hidden;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
          />
        ) : (
          /* 기본 프로필 아이콘 */
          <Icon
            icon="basicProfile"
            size={size}
            css={css`
              color: ${DESIGN_TOKEN_COLOR.blue100};
            `}
          />
        )}
      </div>

      {/* 카메라 버튼 (오른쪽 하단) */}
      {showCameraButton && (
        <button
          css={css`
            position: absolute;
            bottom: 0;
            right: 0;
            width: ${size * 0.3}rem;
            height: ${size * 0.3}rem;
            min-width: 2.4rem;
            min-height: 2.4rem;
            border-radius: 50%;
            background-color: ${DESIGN_TOKEN_COLOR.gray600};
            border: 2px solid ${DESIGN_TOKEN_COLOR.gray00};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray700};
              transform: scale(1.05);
            }
          `}
          onClick={onCameraClick}
          type="button"
        >
          <Icon
            icon="ic_camera"
            size={size * 0.15}
            css={css`
              color: white;
              min-width: 1.2rem;
              min-height: 1.2rem;
            `}
          />
        </button>
      )}
    </div>
  );
}
