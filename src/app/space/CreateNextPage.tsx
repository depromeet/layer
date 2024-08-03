import { css } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ClockImgage from "@/assets/imgs/clock.png";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { ProjectType } from "@/types/space";

export function CreateNextPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data, error, isError } = useApiGetSpace(id);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  if (!data) return null;

  return (
    <DefaultLayout
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          css={css`
            cursor: pointer;
          `}
          onClick={() => navigate("/space/create")}
        />
      }
    >
      <Spacing size={3.2} />
      <Header title={`어울리는 회고 템플릿을\n찾아볼까요?`} contents={data.category === ProjectType.Individual ? "스페이스 생성 완료!" : undefined} />
      <Spacing size={7.4} />
      <div
        css={css`
          text-align: center;
          height: 27.6rem;
        `}
      >
        <img
          src={ClockImgage}
          css={css`
            width: 20rem;
            transition: all 0.5s ease;
            height: auto;
          `}
        />
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary>회고 템플릿 추천 받기</ButtonProvider.Primary>
        <div css={laterTextStyles}>다음에 하기</div>
      </ButtonProvider>
    </DefaultLayout>
  );
}

// 이름 바꾸기
const laterTextStyles = css`
  font-size: 1.6rem;
  padding: 1.6rem 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
`;
