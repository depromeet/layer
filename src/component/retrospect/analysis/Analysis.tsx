import { css } from "@emotion/react";

import { TeamSatisfactionChart } from "./TeamSatisfactionChart";

export const AnalysisContainer = () => {
  return (
    <>
      <div css={css``}>
        <TeamSatisfactionChart teamName={"떡잎마을방법대"} satisfactionCount={8} normalCount={12} regretCount={1} />
      </div>
    </>
  );
};
