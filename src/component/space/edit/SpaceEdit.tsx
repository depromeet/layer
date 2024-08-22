import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "@/api";
import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { ImageUploader } from "@/component/common/ImageUploader/ImageUploader";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { useApiEditSpace } from "@/hooks/api/space/edit/useApiEditSpace";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useInput } from "@/hooks/useInput";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function SpaceEdit() {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();
  const { data, isLoading } = useApiGetSpace(id);
  const { mutate, isPending } = useApiEditSpace();
  const [imgFile, setImgFile] = useState<File | null>(null);
  const { value: name, handleInputChange: handleChangeName, setValue: setName } = useInput();
  const { value: introduction, handleInputChange: handleChangeIntroduction, setValue: setIntroduction } = useInput();

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setIntroduction(data.introduction || "");
    }
  }, [data]);

  const onSubmitEditSpace = async () => {
    try {
      const {
        data: { presignedUrl, imageUrl },
      } = await api.get<{ presignedUrl: string; imageUrl: string }>("/external/image/presigned?domain=SPACE");

      await axios.put(presignedUrl, imgFile, {
        headers: {
          "Content-Type": "image/png",
        },
      });

      mutate({
        spaceId: id,
        name,
        introduction,
        imgUrl: imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || isPending) return <LoadingModal />;

  return (
    <DefaultLayout
      title="스페이스 수정"
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate(`/space/${id}`)}
        />
      }
    >
      <Spacing size={4} />
      <ImageUploader defaultImg={data?.bannerUrl} setImgFile={setImgFile} />
      <Spacing size={5.4} />
      <InputLabelContainer id={"name"}>
        <Label>프로젝트 명</Label>
        <Input onChange={handleChangeName} value={name} count={true} maxLength={10} placeholder="프로젝트 이름을 적어주세요" />
      </InputLabelContainer>
      <Spacing size={4.5} />
      <InputLabelContainer id={"introduction"}>
        <Label>한 줄 설명</Label>
        <TextArea
          onChange={handleChangeIntroduction}
          value={introduction}
          count={true}
          maxLength={20}
          placeholder="프로젝트 한 줄 설명을 적어주세요"
        />
      </InputLabelContainer>
      <ButtonProvider>
        <ButtonProvider.Primary onClick={onSubmitEditSpace}>완료</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}
