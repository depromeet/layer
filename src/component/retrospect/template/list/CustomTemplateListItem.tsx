import { css } from "@emotion/react";

import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { DropdownMenu } from "@/component/common/dropdownMenu/DropdownMenu";
import { TextArea } from "@/component/common/input";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { useDeleteCustomTemplate } from "@/hooks/api/template/useDeleteCustomTemplate";
import { usePatchTemplateTitle } from "@/hooks/api/template/usePatchTemplateTitle";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useInput } from "@/hooks/useInput";
import { useModal } from "@/hooks/useModal";

type CustomTemplateListItem = {
  id: number;
  spaceId: number;
  title: string;
  tag: string;
  date: string;
  createRetrospect?: () => void;
};

const MENU_EDIT = "edit-name";
const MENU_DELETE = "delete";

export function CustomTemplateListItem({ id, spaceId, title, tag, date, createRetrospect }: CustomTemplateListItem) {
  const { open } = useModal();
  const { openBottomSheet } = useBottomSheet();
  const { value: templateTitle, handleInputChange: handleChangeTitle } = useInput(title);
  const { mutate: patchTemplateTitle } = usePatchTemplateTitle(spaceId);
  const { mutate: deleteCustomTemplate } = useDeleteCustomTemplate(spaceId);
  const handleSubmitTitle = () => {
    patchTemplateTitle({ formId: id, formTitle: templateTitle });
  };
  const handleOptionSelect = (option: string) => {
    if (option === MENU_EDIT) {
      openBottomSheet();
    } else if (option === MENU_DELETE) {
      open({
        title: "정말로 삭제할까요?",
        contents: "한 번 삭제되면 다시 복구할 수 없어요",
        options: {
          buttonText: ["취소", "삭제"],
        },
        onConfirm: () => {
          console.log(id);
          deleteCustomTemplate({ formId: id });
        },
      });
    }
  };

  return (
    <>
      <li>
        <Card
          rounded={"md"}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 2rem;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1.2rem;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <Typography variant="S2">{title}</Typography>
              <DropdownMenu onValueChange={(value) => handleOptionSelect(value)}>
                <DropdownMenu.Trigger />
                <DropdownMenu.Content>
                  <DropdownMenu.Item value={MENU_EDIT}>
                    <Typography variant={"subtitle14SemiBold"}>이름 수정하기</Typography>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item value={MENU_DELETE}>
                    <Typography variant={"subtitle14SemiBold"} color={"red500"}>
                      삭제하기
                    </Typography>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
            <Tag>{tag}</Tag>
            <div
              css={
                !createRetrospect &&
                css`
                  align-self: flex-end;
                  margin-top: -0.6rem;
                `
              }
            >
              <Typography variant={"body14Medium"} color={"gray600"}>
                {date}
              </Typography>
            </div>
          </div>
          {createRetrospect && (
            <Button colorSchema={"outline"} onClick={() => createRetrospect()}>
              선택하기
            </Button>
          )}
        </Card>
      </li>
      <BottomSheet
        title="템플릿 이름 수정"
        contents={
          <div
            css={css`
              display: flex;
              height: 100%;
              flex-direction: column;
              margin-top: 2.3rem;
            `}
          >
            <TextArea value={templateTitle} onChange={handleChangeTitle} maxLength={20} count />
            <ButtonProvider>
              <ButtonProvider.Primary onClick={handleSubmitTitle} disabled={!templateTitle}>
                완료
              </ButtonProvider.Primary>
            </ButtonProvider>
          </div>
        }
        sheetHeight={360}
      />
    </>
  );
}
