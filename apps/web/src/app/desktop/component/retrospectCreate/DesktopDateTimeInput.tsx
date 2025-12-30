import { css } from "@emotion/react";
import { format, formatISO } from "date-fns";
import { useMemo, useRef, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { isBeforeToday } from "@/utils/formatDate";
import { DesktopDateTimePicker } from "./DesktopDateTimePicker";
import { COLOR_MAP } from "./constants";
import useClickOutside from "@/hooks/useClickOutside";

const DATE_INPUT_ID = "due-date";

type DesktopDateTimeInput = {
  disablePast?: boolean;
  onValueChange: (isoString?: string) => void;
  defaultValue?: string | Date;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue">;

export function DesktopDateTimeInput({ onValueChange, disablePast = true, defaultValue, ...props }: DesktopDateTimeInput) {
  const colorTheme = () => {
    if (props.disabled) {
      return COLOR_MAP["disabled"];
    }
    if (dateTime) {
      return COLOR_MAP["selected"];
    }
    return COLOR_MAP["default"];
  };

  const defaultDateTime = useMemo(() => {
    if (!defaultValue) return undefined;
    if (typeof defaultValue === "string") {
      return defaultValue;
    } else {
      return formatISO(defaultValue);
    }
  }, [defaultValue]);

  const dateInputElRef = useRef<HTMLLabelElement>(null); // 데이트 인풋 라벨 엘리먼트
  const datePickerElRef = useRef<HTMLDivElement>(null); // 데이트 피커 엘리먼트
  const [dateTime, setDateTime] = useState(defaultDateTime);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useClickOutside(datePickerElRef, (event) => {
    if (dateInputElRef.current?.contains(event.target as Node)) return;
    setDatePickerOpen(false);
  });

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
        ref={dateInputElRef}
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
          onClick={() => {
            setDatePickerOpen((prev) => !prev);
          }}
          css={css`
            display: none;
          `}
          {...props}
        />
      </label>
      {datePickerOpen && (
        <DesktopDateTimePicker
          defaultValue={defaultValue}
          tileDisabled={({ date }) => {
            return disablePast ? isBeforeToday(date) : false;
          }}
          onSave={(dateTime) => {
            setDateTime(dateTime);
            onValueChange(dateTime);
          }}
          ref={datePickerElRef}
        />
      )}
    </>
  );
}
