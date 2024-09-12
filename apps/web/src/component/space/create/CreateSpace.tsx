import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Category } from "@/component/space/create/Category";
import { Field } from "@/component/space/create/Field";
import { Home } from "@/component/space/create/Home";
import { Info } from "@/component/space/create/Info";
import { Thumb } from "@/component/space/create/Thumb";
import { useApiPostSpace } from "@/hooks/api/space/useApiPostSpace";
import { useApiUploadImage } from "@/hooks/api/space/useApiUploadImage";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { useBridge } from "@/lib/provider/bridge-provider";
import { useTestNatigate } from "@/lib/test-natigate";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

const LAST_PAGE = 4;

export function CreateSpace() {
  // const navigate = useNavigate();
  const navigate = useTestNatigate();
  const [spaceValue, setSpaceValue] = useAtom(spaceState);
  const { mutate, isPending } = useApiPostSpace();
  const { bridge } = useBridge();
  const { mutate: uploadImage, isPending: isImageUploading } = useApiUploadImage();

  useEffect(() => {
    bridge.sendBGColor(spaceValue.step === 0 ? "#212529" : "#FFFFFF").catch(console.error);
    if (spaceValue.submit) {
      mutate({
        ...spaceValue,
      });
    }
  }, [spaceValue]);

  const handleNext = () => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      step: prevValues.step + 1,
    }));
  };

  const handleCategoryChange = (typeValues: Pick<SpaceValue, "category">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...typeValues,
      step: prevValues.step + 1,
    }));
  };

  const handleFieldChange = (categoryValues: Pick<SpaceValue, "field">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...categoryValues,
      step: prevValues.step + 1,
    }));
  };

  const handleInfoChange = (infoValues: Pick<SpaceValue, "name" | "introduction">) => {
    setSpaceValue((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: prevValues.step + 1,
    }));
  };

  const handleThumbChange = (thumbValues: Pick<SpaceValue, "imgUrl">) => {
    try {
      const { imgUrl } = thumbValues;

      if (imgUrl) {
        uploadImage(imgUrl as File, {
          onSuccess: (imageUrl) => {
            setSpaceValue((prevValues) => ({
              ...prevValues,
              imgUrl: imageUrl,
              submit: true,
            }));
          },
          onError: (error) => {
            console.error("이미지 업로드 실패:", error);
          },
        });
      } else {
        setSpaceValue((prevValues) => ({
          ...prevValues,
          imgUrl: null,
          submit: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = useCallback(() => {
    void (spaceValue.step > 0
      ? setSpaceValue((prevValues) => ({
          ...prevValues,
          step: prevValues.step - 1,
        }))
      : navigate(-1));
  }, [navigate, setSpaceValue, spaceValue.step]);

  return (
    <DefaultLayout
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          color={spaceValue.step === 0 ? "white" : "default"}
          css={css`
            cursor: pointer;
          `}
          onClick={handleBack}
        />
      }
      theme={spaceValue.step === 0 ? "dark" : "default"}
    >
      {spaceValue.step <= LAST_PAGE + 1 && (
        <ProgressBar
          curPage={spaceValue.step}
          lastPage={LAST_PAGE}
          css={css`
            visibility: ${spaceValue.step === 0 ? "hidden" : "visible"};
          `}
        />
      )}
      {spaceValue.step === 0 && <Home onNext={handleNext} />}
      {spaceValue.step === 1 && <Category onNext={handleCategoryChange} />}
      {spaceValue.step === 2 && <Field onNext={handleFieldChange} />}
      {spaceValue.step === 3 && <Info onNext={handleInfoChange} />}
      {spaceValue.step === 4 && <Thumb onNext={handleThumbChange} isPending={isPending || isImageUploading} />}
    </DefaultLayout>
  );
}
