import ReactCalendar from "react-calendar";
import type { CalendarProps as ReactCalendarProps } from "react-calendar";

import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useDeviceType } from "@/hooks/useDeviceType";

type CalendarProps = ReactCalendarProps;

export function Calendar({ ...props }: CalendarProps) {
  const { deviceType } = useDeviceType();
  return (
    <ReactCalendar
      css={css`
        font-size: ${deviceType === "desktop" ? "1.2rem" : ""};
        line-height: ${deviceType === "desktop" ? "140%" : ""};

        .react-calendar__navigation {
          font-size: ${deviceType === "desktop" ? "1.4rem" : ""};
          line-height: ${deviceType === "desktop" ? "140%" : ""};
          margin-bottom: ${deviceType === "desktop" ? "1.2rem" : ""};
          height: ${deviceType === "desktop" ? "2.8rem" : ""};
        }

        .react-calendar__month-view__weekdays {
          margin-bottom: ${deviceType === "desktop" ? "1.2rem" : ""};
        }
        .react-calendar__month-view__days {
          gap: ${deviceType === "desktop" ? "0.55rem" : ""};
        }
      `}
      calendarType={"gregory"}
      formatDay={(_, date) => new Intl.DateTimeFormat("en", { day: "numeric" }).format(date)}
      prevLabel={<Icon icon={"ic_prev_chevron"} color={DESIGN_TOKEN_COLOR.gray900} style={{ cursor: "inherit" }} />}
      nextLabel={<Icon icon={"ic_next_chevron"} color={DESIGN_TOKEN_COLOR.gray900} style={{ cursor: "inherit" }} />}
      {...props}
    />
  );
}
