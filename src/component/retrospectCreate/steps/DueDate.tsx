import { css } from "@emotion/react";
import { useSetAtom } from "jotai";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { BottomSheet } from "@/component/BottomSheet";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DateTimePicker } from "@/component/retrospectCreate";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { combineDateTimeToISOString, formatDateToString } from "@/utils/formatDate";

const DATE_INPUT_ID = "due-date";

export function DueDate() {
  const retrospectContext = useContext(RetrospectCreateContext);
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { onSelectDate, radioControl, selectedDate, selectedTime } = useDateTimePicker();
  const setRetroCreateData = useSetAtom(retrospectCreateAtom);

  const handleDateOpen = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    openBottomSheet();
  };

  const handleDateSave = () => {
    if (!selectedDate) {
      throw new Error("Undefined DateTime");
    }
    const time = selectedTime ?? "23:59:00";
    const deadlineISOString = combineDateTimeToISOString(selectedDate as Date, Number(time.split(":")[0]) >= 12, time);
    setRetroCreateData((prev) => ({ ...prev, deadline: deadlineISOString }));
    closeBottomSheet();
  };

  return (
    <>
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={4} />
      <label
        htmlFor={DATE_INPUT_ID}
        css={css`
          width: 100%;
          border: 1px solid ${"#e3e6ea"}; // FIXME: 디자인 토큰 적용하기
          border-radius: 0.8rem;
          padding: 1.6rem 1.4rem;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        `}
      >
        {!selectedDate ? (
          <Typography color="lightGrey5" variant="B1">
            회고 마감일을 선택해주세요
          </Typography>
        ) : (
          <Typography color="darkGrayText" variant="B1">
            {`${formatDateToString(selectedDate as Date, ".")} ${selectedTime ?? ""}`}
          </Typography>
        )}
        <Icon icon="ic_calendar" color={!selectedDate ? "#666B75" : "#454952"} size={2} />
        <input
          id={DATE_INPUT_ID}
          type="date"
          onClick={handleDateOpen}
          css={css`
            display: none;
          `}
        />
      </label>
      <BottomSheet
        contents={
          <div
            css={css`
              display: flex;
              flex-direction: column;
              height: 100%;
            `}
          >
            <Spacing size={2.2} />
            <DateTimePicker value={selectedDate} onChange={onSelectDate} radioControl={radioControl} />
            <ButtonProvider
            // onlyContainerStyle={css`
            //   div:nth-of-type(1) {
            //     margin: 0;
            //   }
            // `}
            >
              <ButtonProvider.Primary onClick={handleDateSave} disabled={!selectedDate}>
                설정하기
              </ButtonProvider.Primary>
            </ButtonProvider>
          </div>
        }
        sheetHeight={670}
      />
      <ButtonProvider>
        <ButtonProvider.Primary onClick={retrospectContext.goNext} disabled={!selectedDate}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
