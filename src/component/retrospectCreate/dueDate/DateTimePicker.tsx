import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";

import { TIME } from "./time.const";

import { Icon } from "@/component/common/Icon";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useTabs } from "@/hooks/useTabs";
import { formatTime12to24, isBeforeToday } from "@/utils/formatDate";

type DateTimePickerProps = {
  radioControl: ReturnType<typeof useDateTimePicker>["radioControl"];
} & CalendarProps;

export function DateTimePicker({ radioControl, value: dateValue, ...props }: DateTimePickerProps) {
  const timePickerRef = useRef<HTMLDivElement>(null);
  const { curTab, tabs, selectTab } = useTabs(["오전", "오후"] as const);

  useEffect(() => {
    if (dateValue) {
      timePickerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [dateValue]);

  return (
    <div>
      <Calendar
        value={dateValue}
        calendarType={"gregory"}
        formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
        prevLabel={<Icon icon={"ic_prev_chevron"} style={{ cursor: "pointer" }} />}
        nextLabel={<Icon icon={"ic_next_chevron"} style={{ cursor: "pointer" }} />}
        tileDisabled={({ date }) => isBeforeToday(date)}
        {...props}
      />
      <div
        css={css`
          margin-top: 2.4rem;
          display: ${dateValue ? "block" : "none"};
        `}
      >
        <AmPmTabs tabs={tabs} curTab={curTab} selectTab={selectTab} />
        <Spacing size={2.4} />
        <RadioButtonGroup
          isChecked={radioControl.isTimeChecked}
          onChange={radioControl.onTimeChange}
          radioName={"회고 마감 시간"}
          ref={timePickerRef}
        >
          {TIME.map((time, index) => (
            <Radio key={index} value={formatTime12to24(time, curTab === "오후")}>
              {time}
            </Radio>
          ))}
        </RadioButtonGroup>
      </div>
    </div>
  );
}

type AmPmTabsProps<T extends string> = ReturnType<typeof useTabs<T>>;

function AmPmTabs<T extends string>({ tabs, curTab, selectTab }: AmPmTabsProps<T>) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
      `}
    >
      {tabs.map((tab, index) => (
        <button onClick={() => selectTab(tab)} key={index}>
          {/**FIXME - typography - semibold 적용하기 */}
          <Typography color={tab === curTab ? "dark" : "grey2"} variant="S2">
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
}
