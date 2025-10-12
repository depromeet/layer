import { css } from "@emotion/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { useSatisfactionData } from "@/hooks/useSatisfactionData";

type TeamSatisfactionChartProps = {
  satisfactionLevels: number[];
  /** 커스텀 CSS 스타일 */
  customStyles?: {
    container?: any;
    title?: any;
    chartContainer?: any;
    legend?: any;
  };
  /** 차트 크기 설정 */
  chartSize?: {
    width: number;
    height: number;
    innerRadius: number;
    outerRadius: number;
  };
  /** 레이아웃 타입 */
  layout?: "default" | "compact";
};

export function TeamSatisfactionChart({
  customStyles = {},
  chartSize = {
    width: 240,
    height: 240,
    innerRadius: 45,
    outerRadius: 90,
  },
  layout = "default",
  satisfactionLevels,
}: TeamSatisfactionChartProps) {
  const { data, dominantCategory, dominantColor } = useSatisfactionData(satisfactionLevels);

  // 기본 스타일
  const defaultContainerStyles = css`
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    padding: ${layout === "compact" ? "1.6rem" : "2.8rem"};
    padding-bottom: 0;
    background-color: ${layout === "compact" ? "transparent" : DESIGN_TOKEN_COLOR.gray00};
    position: relative;
  `;

  const defaultTitleStyles = css`
    line-height: 2.6rem;
    margin-bottom: ${layout === "compact" ? "1.6rem" : "2rem"};
  `;

  const defaultChartContainerStyles = css`
    display: flex;
    justify-content: ${layout === "compact" ? "center" : "space-between"};
    width: ${layout === "compact" ? "100%" : "120%"};
    transform: ${layout === "compact" ? "none" : "translateX(-10%)"};
    flex-direction: ${layout === "compact" ? "column" : "row"};
    align-items: ${layout === "compact" ? "center" : "flex-start"};
    gap: ${layout === "compact" ? "6.3rem" : "0"};
  `;

  return (
    <div css={[defaultContainerStyles, customStyles.container]}>
      <Typography variant="subtitle18SemiBold" color="gray900" css={[defaultTitleStyles, customStyles.title]}>
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
      <div css={[defaultChartContainerStyles, customStyles.chartContainer]}>
        <PieChart
          width={chartSize.width}
          height={chartSize.height}
          css={css`
            width: ${layout === "compact" ? "auto" : "60%"};
          `}
        >
          <Pie
            data={data}
            cx={chartSize.width / 2}
            cy={chartSize.height / 2}
            innerRadius={chartSize.innerRadius}
            outerRadius={chartSize.outerRadius}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div
          css={[
            css`
              width: ${layout === "compact" ? "100%" : "40%"};
              height: auto;
              display: flex;
              flex-direction: ${layout === "compact" ? "row" : "column"};
              justify-content: ${layout === "compact" ? "center" : "center"};
              align-items: ${layout === "compact" ? "center" : "flex-start"};
              gap: ${layout === "compact" ? "2rem" : "1rem"};
              flex-wrap: ${layout === "compact" ? "wrap" : "nowrap"};
            `,
            customStyles.legend,
          ]}
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
