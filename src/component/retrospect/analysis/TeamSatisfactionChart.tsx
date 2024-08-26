import { css } from "@emotion/react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const COLORS = [DESIGN_TOKEN_COLOR.blue600, DESIGN_TOKEN_COLOR.gray300, DESIGN_TOKEN_COLOR.red300];

type TeamSatisfactionChartProps = {
  teamName: string;
  satisfactionCount: number;
  normalCount: number;
  regretCount: number;
};

export const TeamSatisfactionChart = ({ teamName, satisfactionCount, normalCount, regretCount }: TeamSatisfactionChartProps) => {
  const data = useMemo(
    () => [
      { name: "만족해요", value: satisfactionCount },
      { name: "평범해요", value: normalCount },
      { name: "후회해요", value: regretCount },
    ],
    [satisfactionCount, normalCount, regretCount],
  );

  const maxIndex = data.reduce((maxIdx, current, idx, array) => (current.value > array[maxIdx].value ? idx : maxIdx), 0);
  const dominantCategory = data[maxIndex].name;
  const dominantColor = COLORS[maxIndex];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 2.8rem;
        border-radius: 0.8rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        position: relative;
      `}
    >
      <Typography
        variant="subtitle18SemiBold"
        color="gray900"
        css={css`
          line-height: 2.6rem;
        `}
      >
        {teamName} 팀은 <br />
        진행상황에 대해 대부분{" "}
        <span
          css={css`
            color: ${dominantColor};
          `}
        >
          {dominantCategory}
        </span>
      </Typography>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 120%;
        `}
      >
        <PieChart
          width={240}
          height={240}
          css={css`
            width: 60%;
          `}
        >
          <Pie data={data} cx={120} cy={120} innerRadius={50} outerRadius={90} startAngle={90} endAngle={450} dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div
          css={css`
            width: 40%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 0.6rem;
          `}
        >
          <LegendInfo type="만족해요" value={satisfactionCount} />
          <LegendInfo type="평범해요" value={normalCount} />
          <LegendInfo type="후회해요" value={regretCount} />
        </div>
      </div>
    </div>
  );
};

type LegendInfoProps = {
  type: "만족해요" | "평범해요" | "후회해요";
  value: number;
};

const LegendInfo = ({ type, value }: LegendInfoProps) => {
  const getLegendDetails = (type: LegendInfoProps["type"]) => {
    switch (type) {
      case "만족해요":
        return {
          color: DESIGN_TOKEN_COLOR.blue600,
          emoji: "😊",
        };
      case "평범해요":
        return {
          color: DESIGN_TOKEN_COLOR.gray300,
          emoji: "😐",
        };
      case "후회해요":
        return {
          color: DESIGN_TOKEN_COLOR.red300,
          emoji: "😞",
        };
      default:
        return {
          color: DESIGN_TOKEN_COLOR.gray300,
          emoji: "😐",
        };
    }
  };

  const { color, emoji } = getLegendDetails(type);

  return (
    <div
      css={css`
        width: fit-content;
        display: flex;
        gap: 0.4rem;
        align-items: center;
      `}
    >
      <Icon icon="ic_bluePoint" size={2} color={color} />
      <Typography variant="body13Medium" color="gray900">
        {emoji} {type}
      </Typography>
      <Typography variant="body13Medium" color="gray500">
        {value}
      </Typography>
    </div>
  );
};
