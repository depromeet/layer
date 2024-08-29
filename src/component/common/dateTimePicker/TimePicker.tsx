import { css } from "@emotion/react";
import { forwardRef } from "react";

import { TIME_24 } from "@/component/common/dateTimePicker/time.const";
import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Typography } from "@/component/common/typography";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useTabs } from "@/hooks/useTabs";

type TimePickerProps = {
  radioControl: ReturnType<typeof useDateTimePicker>["radioControl"];
};
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(function ({ radioControl }, ref) {
  const { curTab, tabs, selectTab } = useTabs(["오전", "오후"] as const);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
      `}
    >
      <AmPmTabs tabs={tabs} curTab={curTab} selectTab={selectTab} />
      <RadioButtonGroup isChecked={radioControl.isTimeChecked} onChange={radioControl.onTimeChange} radioName={"회고 마감 시간"} ref={ref}>
        {curTab === "오전" &&
          TIME_24.slice(0, 12).map((time, index) => {
            return (
              <Radio key={index} value={time}>
                {time}
              </Radio>
            );
          })}
        {curTab === "오후" &&
          TIME_24.slice(12).map((time, index) => {
            return (
              <Radio key={index} value={time}>
                {`${Number(time.split(":")[0]) - 12}:00`}
              </Radio>
            );
          })}
      </RadioButtonGroup>
    </div>
  );
});

TimePicker.displayName = "TimePicker";

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
          <Typography color={tab === curTab ? "dark" : "grey2"} variant="S2">
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
}
