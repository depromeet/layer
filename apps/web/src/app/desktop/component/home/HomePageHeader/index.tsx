import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";

export default function HomePageHeader() {
  return (
    <header
      css={css`
        text-align: center;
      `}
    >
      <Typography color="gray900" variant="heading28Bold">
        내 회고 리포트
      </Typography>
    </header>
  );
}
