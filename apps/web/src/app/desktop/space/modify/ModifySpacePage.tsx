import { ButtonProvider } from "@/component/common/button";
import { ImageUploader } from "@/component/common/ImageUploader";
import { Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import useModifySpace from "@/hooks/app/space/useModifySpace";
import { useDesktopBasicModal } from "@/hooks/useDesktopBasicModal";
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";

// 데스크톱 환경에서는 해당 수정 페이지가 모달 안에 이식되어요
export default function ModifySpacePage() {
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get("spaceId") as string;
  const {
    data,
    isLoading,
    isPending,
    setImgFile,
    name,
    handleChangeName,
    introduction,
    handleChangeIntroduction,
    onSubmitEditSpace,
    initializeSearchQuery,
  } = useModifySpace({ id: spaceId });
  const { close: closeDesktopModal } = useDesktopBasicModal();

  if (isLoading || isPending) return <LoadingModal />;

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      `}
    >
      <ImageUploader defaultImg={data?.bannerUrl} setImgFile={setImgFile} />
      <Spacing size={4} />
      <InputLabelContainer id={"name"}>
        <Label>프로젝트 명</Label>
        <Input onChange={handleChangeName} value={name} count={true} maxLength={10} placeholder="프로젝트 이름을 적어주세요" />
      </InputLabelContainer>
      <Spacing size={3} />
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
      <ButtonProvider
        sort="horizontal"
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray
          onClick={() => {
            initializeSearchQuery();
            closeDesktopModal();
          }}
        >
          취소
        </ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={onSubmitEditSpace}>완료</ButtonProvider.Primary>
      </ButtonProvider>
    </section>
  );
}
