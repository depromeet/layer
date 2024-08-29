import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { COOKIE_VALUE_SAVE_SPACE_ID_PHASE } from "@/app/space/space.const.ts";
import { Button, ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { SocialLoginArea } from "@/component/login";
import { JoinLetter } from "@/component/space/join/JoinLetter.tsx";
import { PATHS } from "@/config/paths.ts";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace";
import { useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { decryptId } from "@/utils/space/cryptoKey";

export function JoinSpace() {
  const { id } = useParams() as { id: string };
  const spaceId = decryptId(id);
  const { data, isLoading } = useApiGetSpace(spaceId, true);
  const { mutate, isPending } = useApiJoinSpace();
  const { toast } = useToast();
  const { open, close } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    return () => close();
  }, []);

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <DefaultLayout theme="gray" LeftComp={null}>
        <span
          id="essential_data"
          css={css`
            display: none;
          `}
        >
          <span id="name">{data?.leader.name}</span>
          <span id="team">{data?.name}</span>
        </span>
        <Header title={`${data?.leader.name}님이\n${data?.name} 팀에 초대했어요!`} contents={`${data?.name} 팀에서 함께 회고를 진행해볼까요?`} />
        <JoinLetter space={data!.name} description={data!.introduction} imgUrl={data!.bannerUrl} />
        <ButtonProvider isProgress={isPending}>
          <ButtonProvider.Primary
            onClick={() =>
              mutate(Number(spaceId), {
                onSuccess: () => {
                  toast.success(`스페이스에 초대 되었어요!`);
                  navigate(PATHS.spaceDetail(spaceId));
                },
                onError: (error) => {
                  if (error.status === 400) {
                    toast.success("이미 참여한 스페이스로 이동했어요!");
                    navigate(PATHS.spaceDetail(spaceId));
                  }
                  if (error.status === 403) {
                    // 로그인 또는 회원가입 후, 해당 쿠키 값을 판별하여 스페이스 가입을 진행합니다.
                    // FIXME: Cookie 모음 저장 필요
                    Cookies.set(COOKIE_VALUE_SAVE_SPACE_ID_PHASE, spaceId);
                    open({
                      title: "스페이스 참여를 위해 로그인이 필요해요",
                      contents: "지금 팀원들과 함께 회고를 진행해보세요",
                      overrideActionElements: (
                        <Fragment>
                          <SocialLoginArea
                            css={css`
                              width: 100%;
                            `}
                            onlyContainerStyle={css`
                              padding: 1rem 0;
                            `}
                          />
                          <Button
                            onClick={() => {
                              Cookies.remove(COOKIE_VALUE_SAVE_SPACE_ID_PHASE);
                              close();
                            }}
                          >
                            다음에 하기
                          </Button>
                        </Fragment>
                      ),
                    });
                  }
                },
              })
            }
          >
            수락하기
          </ButtonProvider.Primary>
        </ButtonProvider>
      </DefaultLayout>
    </>
  );
}
