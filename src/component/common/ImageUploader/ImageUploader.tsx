import { css } from "@emotion/react";
import { useRef, useState } from "react";

import DefaultSpaceImgUrl from "@/assets/imgs/space/spaceDefaultImg.png";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type ImageUploaderProps = {
  defaultImg?: string;
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export const ImageUploader = ({ defaultImg, setImgFile }: ImageUploaderProps) => {
  const [imgUrl, setImgUrl] = useState(defaultImg || DefaultSpaceImgUrl);

  const ref = useRef<HTMLInputElement>(null);

  const saveImageFile = () => {
    const file = ref.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
        setImgFile(file);
      };
    }
  };

  const handleImageClick = () => {
    ref.current?.click();
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        onClick={handleImageClick}
        css={css`
          position: relative;
          img {
            object-fit: cover;
            width: 18rem;
            height: 18rem;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 1rem;
            position: relative;
            cursor: pointer;
          }
        `}
      >
        <img src={imgUrl || DefaultSpaceImgUrl} onError={(e) => (e.currentTarget.src = DefaultSpaceImgUrl)} alt="Preview" />
        <div
          css={css`
            position: absolute;
            width: 4.2rem;
            height: 4.2rem;
            border-radius: 50%;
            bottom: 1.2rem;
            right: 0.4rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray500};
            border: 0.4rem solid ${DESIGN_TOKEN_COLOR.gray00};
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Icon icon="ic_camera" />
        </div>
      </div>
      <input
        ref={ref}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={saveImageFile}
        css={css`
          display: none;
        `}
      />
    </div>
  );
};
