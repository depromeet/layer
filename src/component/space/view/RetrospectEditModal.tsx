import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { DateTimeInput, Input, InputLabelContainer, Label, TextArea } from "@/component/common/input";
import { FullModal } from "@/component/common/Modal/FullModal";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { usePatchRetrospect } from "@/hooks/api/retrospect/edit/usePatchRetrospect";
import { useInput } from "@/hooks/useInput";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { Retrospect } from "@/types/retrospect";

type RetrospectEditProps = {
  spaceId: string;
  retrospectId: string;
  defaultValue: Pick<Retrospect, "title" | "introduction" | "deadline">;
  close: () => void;
};

export function RetrospectEditModal({ spaceId, retrospectId, defaultValue, close }: RetrospectEditProps) {
  const { mutate: patchRetrospect, isSuccess, isPending } = usePatchRetrospect(spaceId);
  const { value: title, handleInputChange: handleTitleChange } = useInput(defaultValue.title);
  const { value: introduction, handleInputChange: handleIntroductionChange } = useInput(defaultValue.introduction);
  const [deadline, setDeadline] = useState(defaultValue.deadline);

  const isEdited = title !== defaultValue.title || introduction !== defaultValue.introduction || deadline !== defaultValue.deadline;

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  return (
    <>
      <FullModal>
        <DefaultLayout
          title="회고 수정"
          LeftComp={<Icon icon={"ic_arrow_left"} size={2.4} onClick={close} />}
          RightComp={
            <button
              disabled={!isEdited}
              onClick={() => {
                patchRetrospect({ spaceId: +spaceId, retrospectId: +retrospectId, data: { title, introduction, deadline } });
              }}
            >
              <Typography variant={"subtitle16SemiBold"} color={isEdited ? "blue600" : "gray400"}>
                완료
              </Typography>
            </button>
          }
        >
          <Spacing size={4} />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 3.2rem;
            `}
          >
            <InputLabelContainer id={`retro-title-${retrospectId}`}>
              <Label>회고 명</Label>
              <Input value={title} onChange={handleTitleChange} count maxLength={10} />
            </InputLabelContainer>
            <InputLabelContainer id={`retro-intro-${retrospectId}`}>
              <Label>한 줄 설명</Label>
              <TextArea
                value={introduction}
                onChange={handleIntroductionChange}
                placeholder="회고에 대한 한 줄 설명을 적어주세요"
                count
                maxLength={20}
              />
            </InputLabelContainer>
            <InputLabelContainer id={`retro-intro-${retrospectId}`}>
              <Label>회고 마감일</Label>
              <DateTimeInput
                defaultValue={defaultValue.deadline}
                onValueChange={(value) => {
                  if (value) setDeadline(value);
                }}
              />
            </InputLabelContainer>
          </div>
        </DefaultLayout>
      </FullModal>
      {isPending && <LoadingModal purpose="데이터를 저장하고 있어요" />}
    </>
  );
}
