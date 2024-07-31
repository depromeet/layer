import { useNavigate } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Spacing } from "@/component/common/Spacing";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function RetrospectCreateComplete() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <Spacing size={2.9} />
      <Header title={"회고가 완성되었어요!\n바로 회고를 작성해볼까요?"} contents="다음 회고에서도 해당 템플릿으로 제공해드릴게요!" />
      <ButtonProvider sort="horizontal">
        <ButtonProvider.Gray onClick={() => navigate(-1)}>끝내기</ButtonProvider.Gray>
        <ButtonProvider.Primary
          onClick={() => {
            /**TODO - 해당 템플릿을 가지고 회고 작성 페이지로 이동 */
          }}
        >
          작성하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
}