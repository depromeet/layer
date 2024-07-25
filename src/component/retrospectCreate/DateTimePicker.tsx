import { css } from "@emotion/react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";

import { Divider } from "@/component/common/divider/Divider";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useTabs } from "@/hooks/useTabs";

type DateTimePickerProps = {
  // selected: Date;
  // onChange: (newDate: Date) => void;
} & CalendarProps;

export function DateTimePicker({ ...props }: DateTimePickerProps) {
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
