import { css } from "@emotion/react";
import { forwardRef, useEffect, useRef } from "react";

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
  const radioButtonsContainerRef = useRef<HTMLDivElement>(null);

  const pmFirstItemRef = useRef<HTMLLabelElement>(null);
  const amFirstItemRef = useRef<HTMLLabelElement>(null);

  /**
   * 탭을 클릭해 scrollIntoView가 작동 중인지에 대한 상태
   */
  const isScrollingIntoView = useRef(false);

  useEffect(() => {
    const checkPmInView = () => {
      if (isScrollingIntoView.current) {
        return;
      }

      const pmFirstClientRect = pmFirstItemRef.current?.getBoundingClientRect();
      if (pmFirstClientRect && pmFirstClientRect.x < 200) {
        selectTab("오후");
      } else {
        selectTab("오전");
      }
    };

    const containerRef = radioButtonsContainerRef.current;
    containerRef?.addEventListener("scroll", checkPmInView);

    return () => {
      containerRef?.removeEventListener("scroll", checkPmInView);
    };
  }, [selectTab]);

  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
      `}
    >
      <AmPmTabs
        tabs={tabs}
        curTab={curTab}
        selectTab={(tab) => {
          selectTab(tab);
          isScrollingIntoView.current = true;

          if (tab === "오후") {
            pmFirstItemRef.current?.scrollIntoView({ behavior: "smooth", inline: "start" });
          }
          if (tab === "오전") {
            amFirstItemRef.current?.scrollIntoView({ behavior: "smooth", inline: "start" });
          }

          setTimeout(() => {
            isScrollingIntoView.current = false;
          }, 1000);
        }}
      />
      <div
        css={css`
          display: flex;
        `}
      >
        <RadioButtonGroup
          isChecked={radioControl.isTimeChecked}
          onChange={radioControl.onTimeChange}
          radioName={"회고 마감 시간"}
          ref={radioButtonsContainerRef}
        >
          {TIME_24.slice(0, 13).map((time, index) => {
            return (
              <Radio ref={index === 0 ? amFirstItemRef : null} value={time} key={index}>
                <span>{time}</span>
              </Radio>
            );
          })}
          {TIME_24.slice(13).map((time, index) => {
            return (
              <Radio ref={index === 0 ? pmFirstItemRef : null} value={time} key={index}>
                <span>{time}</span>
              </Radio>
            );
          })}
        </RadioButtonGroup>
      </div>
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
