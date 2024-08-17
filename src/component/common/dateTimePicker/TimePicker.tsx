import { css } from "@emotion/react";
import { forwardRef } from "react";

import { Radio, RadioButtonGroup } from "@/component/common/radioButton";
import { Typography } from "@/component/common/typography";
import { TIME } from "@/component/retrospectCreate/dueDate/time.const";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";
import { useTabs } from "@/hooks/useTabs";
import { formatTime12to24 } from "@/utils/formatDate";

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
        {TIME.map((time, index) => (
          <Radio key={index} value={formatTime12to24(time, curTab === "오후")}>
            {time}
          </Radio>
        ))}
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
