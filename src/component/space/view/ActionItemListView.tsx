import { css } from "@emotion/react";
import { useEffect, useState, Fragment } from "react";

import { BottomSheet } from "@/component/BottomSheet";
import { Button } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useApiPostActionItem } from "@/hooks/api/actionItem/useApiPostActionItem";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { ActionItemType } from "@/types/actionItem";

type TeamGoalViewPros = {
  teamActionList: ActionItemType[];
};

type ActionItemProps = {
  actionItemContent: string;
};

type PostActionItemProps = {
  retrospectId: string;
  actionItemContent: string;
};

export function ActionItemListView({ teamActionList }: TeamGoalViewPros) {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [textValue, setTextValue] = useState("");
  const { mutate: postActionItem } = useApiPostActionItem();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleAddActionItem = ({ retrospectId, actionItemContent }: PostActionItemProps) => {
    if (textValue.trim() === "") {
      return;
    }
    postActionItem({ retrospectId: retrospectId, content: actionItemContent });

    setTextValue("");
    closeBottomSheet();
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 16.9rem;
        background-color: ${DESIGN_SYSTEM_COLOR.white};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography variant="B2_SEMIBOLD">실행목표</Typography>
        <Typography variant="B2_MEDIUM" color="darkGray">
          더보기
        </Typography>
      </div>

      <Spacing size={1.0} />

      {teamActionList && teamActionList.length === 0 && (
        <>
          <button
            onClick={openBottomSheet}
            css={css`
              width: 4rem;
              height: 4rem;
              background-color: ${DESIGN_SYSTEM_COLOR.grey200};
              border-radius: 0.8rem;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icon icon="ic_plus" size="1.5rem" color="rgba(169, 175, 187, 1)" />
          </button>
          <Spacing size={1.6} />
          <Typography variant="B2_MEDIUM" color="darkGray">
            실행목표를 설정해보세요.
          </Typography>
        </>
      )}

      {teamActionList && teamActionList.length !== 0 && (
        <>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
            `}
          >
            {teamActionList.map((actionItem, idx) => (
              <ActionItem key={idx} actionItemContent={actionItem.actionItemContent} />
            ))}

            {Array.from({ length: 3 - teamActionList.length }).map((_, index) => (
              <div key={`plus-${index}`} onClick={openBottomSheet}>
                <PlusActionItem />
              </div>
            ))}
          </div>
        </>
      )}
      <BottomSheet
        sheetHeight={300}
        contents={
          <Fragment>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2.5rem;
              `}
            >
              <Typography variant="S1">실행 목표 추가</Typography>
              <textarea
                placeholder="Text"
                value={textValue}
                onChange={handleTextChange}
                css={css`
                  width: 100%;
                  height: 8.1rem;
                  border: 1px solid ${DESIGN_SYSTEM_COLOR.grey300};
                  border-radius: 1.2rem;
                  padding: 1.4rem 1.6rem;
                  font-size: 1.4rem;
                  resize: none;
                  &:focus {
                    border-color: ${DESIGN_SYSTEM_COLOR.blue600};
                    outline: none;
                  }
                `}
              />
              <Button
                colorSchema="black"
                onClick={() => {
                  handleAddActionItem({ retrospectId: "100", actionItemContent: textValue });
                }}
              >
                추가하기
              </Button>
            </div>
          </Fragment>
        }
        handler={true}
      />
    </div>
  );
}

function ActionItem({ actionItemContent }: ActionItemProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
        height: 3.2rem;
      `}
    >
      <Icon icon="ic_bluePoint" size={1.6} />
      <Typography variant="B2_MEDIUM">{actionItemContent}</Typography>
    </div>
  );
}

function PlusActionItem() {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.8rem;
          height: 3.2rem;
        `}
      >
        <div
          css={css`
            width: 1.4rem;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${DESIGN_SYSTEM_COLOR.grey100};
          `}
        >
          <Icon icon="ic_plus" color="rgba(169, 175, 187, 1)" size={0.6} />
        </div>
        <Typography variant="B2_MEDIUM" color="grey500">
          실행목표 추가하기
        </Typography>
      </div>
    </>
  );
}
