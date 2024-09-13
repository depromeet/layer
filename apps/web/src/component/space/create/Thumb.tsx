import { Fragment, useState } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { ImageUploader } from "@/component/common/ImageUploader";
import { Spacing } from "@/component/common/Spacing";
import { SpaceValue } from "@/types/space";

type ThumbValues = Pick<SpaceValue, "imgUrl">;

export function Thumb({ onNext, isPending }: { onNext: (thumbValues: ThumbValues) => void; isPending: boolean }) {
  const [imgFile, setImgFile] = useState<File | null>(null);
  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`프로젝트의\n대표 이미지를 설정할까요?`} />
      <Spacing size={6.5} />
      <ImageUploader setImgFile={setImgFile} />
      <ButtonProvider>
        <ButtonProvider.Primary
          isProgress={isPending}
          onClick={() =>
            onNext({
              imgUrl: imgFile,
            })
          }
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}
