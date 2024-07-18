import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { Card } from "@/component/common/Card";
import { Header } from "@/component/common/header";
import { Typography } from "@/component/common/typography";

export function CustomTemplate() {
  const retroContext = useContext(RetrospectCreateContext);
  return (
    <>
      <Header title={"해당 템플릿으로\n수정 없이 회고를 진행할까요?"} contents={"질문을 추가하거나 뺄 수 있어요!"} />
      <Card>
        <Typography>빠르고 효율적인 회고</Typography>
      </Card>
    </>
  );
}
