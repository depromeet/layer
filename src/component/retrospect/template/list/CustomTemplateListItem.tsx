import { css } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TemplateListPageContext } from "@/app/retrospect/template/list/TemplateListPage";
import { BottomSheet } from "@/component/BottomSheet";
import { Button, ButtonProvider } from "@/component/common/button";
import { Card } from "@/component/common/Card";
import { DropdownMenu } from "@/component/common/dropdownMenu/DropdownMenu";
import { TextArea } from "@/component/common/input";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { useDeleteCustomTemplate } from "@/hooks/api/template/useDeleteCustomTemplate";
import { usePatchTemplateTitle } from "@/hooks/api/template/usePatchTemplateTitle";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useInput } from "@/hooks/useInput";
import { useModal } from "@/hooks/useModal";

type CustomTemplateListItem = {
  id: number;
  title: string;
  tag: string;
  date: string;
};

export function CustomTemplateListItem({ id, title, tag, date }: CustomTemplateListItem) {
  const MENU_EDIT = "edit-name";
  const MENU_DELETE = "delete";
  const SHEET_ID = `modifyTemplateSheet_${id}`;

  const { spaceId, readOnly } = useContext(TemplateListPageContext);
  const navigate = useNavigate();
  const { open } = useModal();
  const { openBottomSheet } = useBottomSheet();
  const { value: templateTitle, handleInputChange: handleChangeTitle } = useInput(title);
  const { mutate: patchTemplateTitle } = usePatchTemplateTitle(+spaceId);
  const { mutate: deleteCustomTemplate } = useDeleteCustomTemplate(+spaceId);
  const handleSubmitTitle = () => {
    patchTemplateTitle({ formId: id, formTitle: templateTitle });
  };
  const handleOptionSelect = (option: string) => {
    if (option === MENU_EDIT) {
      openBottomSheet({ id: SHEET_ID });
    } else if (option === MENU_DELETE) {
      open({
        title: "정말로 삭제할까요?",
        contents: "한 번 삭제되면 다시 복구할 수 없어요",
        options: {
          buttonText: ["취소", "삭제"],
        },
        onConfirm: () => {
          deleteCustomTemplate({ formId: id });
        },
      });
    }
  };

  return (
    <>
      <li
        css={css`
          cursor: pointer;
        `}
        onClick={() =>
          navigate(PATHS.viewDetailTemplate(), {
            state: {
              templateId: id,
              readOnly,
            },
          })
        }
      >
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
              {readOnly && (
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
              )}
            </div>
            <Tag>{tag}</Tag>
            <div
              css={
                readOnly &&
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
          {!readOnly && (
            <Button
              colorSchema={"outline"}
              onClick={() => {
                navigate(PATHS.retrospectCreate(), {
                  state: { spaceId, templateId: id },
                });
              }}
            >
              선택하기
            </Button>
          )}
        </Card>
      </li>
      <BottomSheet
        id={SHEET_ID}
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
