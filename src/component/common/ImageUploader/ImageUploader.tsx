import { css } from "@emotion/react";
import { useRef, useState } from "react";

import { defaultImgUrl } from "@/component/space/space.const";

type ImageUploaderProps = {
  defaultImg?: string;
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export const ImageUploader = ({ defaultImg, setImgFile }: ImageUploaderProps) => {
  const [imgUrl, setImgUrl] = useState(defaultImg || defaultImgUrl);

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
          width: 18rem;
          height: 18rem;
          border-radius: ${imgUrl === defaultImgUrl ? "none" : "50%"};
          overflow: hidden;
          margin-bottom: 1rem;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      >
        <img src={imgUrl} alt="Preview" />
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
