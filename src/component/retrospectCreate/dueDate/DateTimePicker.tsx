import { css } from "@emotion/react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";

import { TIME } from "./time.const";

import { Divider } from "@/component/common/divider";
import { Icon } from "@/component/common/Icon";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useTabs } from "@/hooks/useTabs";

type DateTimePickerProps = {
  radioControl: ReturnType<typeof useDateTimePicker>["radioControl"];
} & CalendarProps;

export function DateTimePicker({ radioControl, ...props }: DateTimePickerProps) {
  const { curTab, tabs, selectTab } = useTabs(["오전", "오후"] as const);

  return (
    <div>
      <Calendar
        {...props}
        calendarType={"gregory"}
        formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
        prevLabel={<Icon icon={"ic_prev_chevron"} style={{ cursor: "pointer" }} />}
        nextLabel={<Icon icon={"ic_next_chevron"} style={{ cursor: "pointer" }} />}
      />
      <Divider direction="horizontal" />
      <AmPmTabs tabs={tabs} curTab={curTab} selectTab={selectTab} />
      <Spacing size={2.4} />
      <RadioButtonGroup isChecked={radioControl.isTimeChecked} onChange={radioControl.onTimeChange} radioName={"회고 마감 시간"}>
        {TIME.map((time, index) => (
          <Radio key={index} value={`${curTab} ${time}`}>
            {time}
          </Radio>
        ))}
      </RadioButtonGroup>
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
