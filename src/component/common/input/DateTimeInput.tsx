import { css } from "@emotion/react";
import { format } from "date-fns";
import { useState } from "react";

import { DateTimePicker } from "@/component/common/dateTimePicker";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { isBeforeToday } from "@/utils/formatDate";

const DATE_INPUT_ID = "due-date";

type DateTimeInput = {
  disablePast?: boolean;
  onValueChange: (isoString?: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function DateTimeInput({ onValueChange, disablePast = true, ...props }: DateTimeInput) {
  const COLOR_MAP = {
    default: {
      text: "gray500",
      border: "gray300",
      icon: "gray700",
    },
    focus: {
      text: "gray500",
      border: "blue600",
      icon: "gray800",
    },
    selected: {
      text: "gray800",
      border: "gray300",
      icon: "gray800",
    },
    disabled: {
      text: "gray300",
      border: "gray300",
      icon: "gray300",
    },
  } as const;

  const colorTheme = () => {
    if (props.disabled) {
      return COLOR_MAP["disabled"];
    }
    if (dateTime) {
      return COLOR_MAP["selected"];
    }
    return COLOR_MAP["default"];
  };

  const [dateTime, setDateTime] = useState<string>();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const handleDateOpen = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    openBottomSheet({ id: "datePickerSheet" });
  };

  return (
    <>
      <label
        htmlFor={DATE_INPUT_ID}
        css={css`
          width: 100%;
          border: 1px solid ${DESIGN_TOKEN_COLOR[colorTheme()["border"]]};
          border-radius: 0.8rem;
          padding: 1.6rem 1.4rem;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        `}
      >
        {!dateTime ? (
          <Typography color={colorTheme()["text"]} variant={"body15Medium"}>
            회고 마감일을 선택해주세요
          </Typography>
        ) : (
          <Typography color={colorTheme()["text"]} variant={"body15Medium"}>
            {`${format(new Date(dateTime), "yyyy.MM.dd H:mm")}`}
          </Typography>
        )}
        <Icon icon="ic_calendar" color={!dateTime ? DESIGN_TOKEN_COLOR.gray700 : DESIGN_TOKEN_COLOR.gray800} size={2} />
        <input
          id={DATE_INPUT_ID}
          type="date"
          onClick={handleDateOpen}
          css={css`
            display: none;
          `}
          {...props}
        />
      </label>
      <DateTimePicker
        tileDisabled={({ date }) => {
          return disablePast ? isBeforeToday(date) : false;
        }}
        onSave={(dateTime) => {
          setDateTime(dateTime);
          onValueChange(dateTime);
          closeBottomSheet();
        }}
      />
    </>
  );
}
