import { css } from "@emotion/react";
import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { Tag } from "@/component/common/tag";
import { Typography } from "@/component/common/typography";

export function CustomTemplate() {
  const retroContext = useContext(RetrospectCreateContext);
  return (
    <>
      <Header title={"해당 템플릿으로\n수정 없이 회고를 진행할까요?"} contents={"질문을 추가하거나 뺄 수 있어요!"} />
      <Card shadow>
        {/**FIXME - 추천받은 템플릿 데이터를 받아와서 적용되어야 함. 현재는 임시! */}
        <div
          css={css`
            padding: 1rem;
          `}
        >
          <Typography variant={"S1"}>빠르고 효율적인 회고</Typography>
          <Spacing size={0.8} />
          <Tag>KPT회고</Tag>
        </div>
      </Card>
    </>
  );
}
