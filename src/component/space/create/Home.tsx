import { Fragment } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { NeonIllustrator } from "@/component/space/create/NeonIllustrator.tsx";

export function Home({ onNext }: { onNext: () => void }) {
  return (
    <Fragment>
      <Spacing size={2.9} />
      <Header title={`회고 스페이스를\n만들어볼까요?`} contents="회고를 진행하기 위한 공간이 필요해요" theme="white" />
      <NeonIllustrator />
      <ButtonProvider>
        <ButtonProvider.Gray onClick={onNext}>
          <Typography variant="B1">시작하기</Typography>
        </ButtonProvider.Gray>
      </ButtonProvider>
    </Fragment>
  );
}
