import { css } from "@emotion/react";
import { Fragment, useRef, useState } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { defaultImgUrl } from "@/component/space/space.const";
import { SpaceValue } from "@/types/space";

type ThumbValues = Pick<SpaceValue, "imgUrl">;

export function Thumb({ onNext }: { onNext: (thumbValues: ThumbValues) => void }) {
  const [imgUrl, setImgUrl] = useState(defaultImgUrl);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImageFile = () => {
    const file = imgRef.current?.files?.[0];
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
    imgRef.current?.click();
  };

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`프로젝트의\n대표 이미지를 설정할까요?`} />
      <Spacing size={6.5} />
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
          ref={imgRef}
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={saveImageFile}
          css={css`
            display: none;
          `}
        />
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary
          onClick={() =>
            onNext({
              imgUrl: imgFile || defaultImgUrl,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
