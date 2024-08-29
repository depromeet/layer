import { css } from "@emotion/react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const COLORS = [
  DESIGN_TOKEN_COLOR.blue600,
  DESIGN_TOKEN_COLOR.blue500,
  DESIGN_TOKEN_COLOR.blue400,
  DESIGN_TOKEN_COLOR.blue700,
  DESIGN_TOKEN_COLOR.blue800,
];

type TeamSatisfactionChartProps = {
  satisfactionLevels: number[];
};

export function TeamSatisfactionChart({ satisfactionLevels }: TeamSatisfactionChartProps) {
  const data = useMemo(() => {
    const levels = [
      { name: "매우 만족", value: satisfactionLevels[0], color: COLORS[0] },
      { name: "만족", value: satisfactionLevels[1], color: COLORS[1] },
      { name: "보통", value: satisfactionLevels[2], color: COLORS[2] },
      { name: "불만족", value: satisfactionLevels[3], color: COLORS[3] },
      { name: "매우 불만족", value: satisfactionLevels[4], color: COLORS[4] },
    ];

    return levels.filter((level) => level.value > 0).sort((a, b) => b.value - a.value);
  }, [satisfactionLevels]);

  const dominantCategory = data[0]?.name || "";
  const dominantColor = data[0]?.color || COLORS[2];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        border-radius: 0.8rem;
        padding: 2.8rem;
        padding-bottom: 0;
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
        우리 팀은 <br />
        진행상황에 대해 대부분{" "}
        <span
          css={css`
            color: ${dominantColor};
          `}
        >
          {dominantCategory}
        </span>
        해요
      </Typography>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 120%;
          transform: translateX(-10%);
        `}
      >
        <PieChart
          width={240}
          height={240}
          css={css`
            width: 60%;
          `}
        >
          <Pie data={data} cx={120} cy={120} innerRadius={45} outerRadius={90} startAngle={90} endAngle={450} dataKey="value" stroke="none">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
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
            justify-content: center;
            gap: 1rem;
          `}
        >
          {data.map((item) => (
            <LegendInfo key={item.name} type={item.name} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

type LegendInfoProps = {
  type: string;
  value: number;
};

const LegendInfo = ({ type, value }: LegendInfoProps) => {
  const emojiMap: Record<string, JSX.Element> = {
    "매우 만족": <Icon icon="ic_very_satisfied" size={2} />,
    만족: <Icon icon="ic_satisfied" size={2} />,
    보통: <Icon icon="ic_neutral" size={2} />,
    불만족: <Icon icon="ic_dissatisfied" size={2} />,
    "매우 불만족": <Icon icon="ic_very_dissatisfied" size={2} />,
  };

  return (
    <div
      css={css`
        width: 12rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 0.4rem;
        `}
      >
        {emojiMap[type]} {type}
      </div>
      <Typography variant="body13Medium" color="gray500">
        {value}
      </Typography>
    </div>
  );
};
