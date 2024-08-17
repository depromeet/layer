import { css } from "@emotion/react";
import { useState } from "react";

import { DateTimePicker } from "@/component/common/dateTimePicker";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { formatDateToString } from "@/utils/formatDate";

const DATE_INPUT_ID = "due-date";

type DateTimeInput = {
  onChangeValue: ({ date, time }: { date: Date; time?: string }) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function DateTimeInput({ onChangeValue, ...props }: DateTimeInput) {
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
    if (dateTime?.date) {
      return COLOR_MAP["selected"];
    }
    return COLOR_MAP["default"];
  };

  const [dateTime, setDateTime] = useState<{ date: Date; time?: string }>();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const handleDateOpen = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    openBottomSheet();
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
        {!dateTime?.date ? (
          <Typography color={colorTheme()["text"]} variant={"body15Medium"}>
            회고 마감일을 선택해주세요
          </Typography>
        ) : (
          <Typography color={colorTheme()["text"]} variant={"body15Medium"}>
            {`${formatDateToString(dateTime.date, ".")} ${dateTime.time ?? ""}`}
          </Typography>
        )}
        <Icon icon="ic_calendar" color={!dateTime?.date ? DESIGN_TOKEN_COLOR.gray700 : DESIGN_TOKEN_COLOR.gray800} size={2} />
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
        onSave={({ date, time }) => {
          setDateTime({ date, time });
          onChangeValue({ date, time });
          closeBottomSheet();
        }}
      />
    </>
  );
}
