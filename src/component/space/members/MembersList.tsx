import { css } from "@emotion/react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IconButton } from "@/component/common/button";
import { DropdownMenu } from "@/component/common/dropdownMenu/DropdownMenu";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { MembersItem } from "@/component/space/members/MembersItem";
import { useApiGetUser } from "@/hooks/api/auth/useApiGetUser";
import { useApiGetMemers } from "@/hooks/api/space/members/useApiGetMembers";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { shareKakao } from "@/utils/kakao/sharedKakaoLink";
import { encryptId } from "@/utils/space/cryptoKey";

export type EditType = "LEADER" | "KICK";

export function MembersList() {
  const { spaceId } = useParams() as { spaceId: string };
  const { data, isLoading } = useApiGetMemers(spaceId);
  const { open, close } = useModal();
  const { data: userData } = useApiGetUser();
  const { toast } = useToast();
  const naviagate = useNavigate();
  const encryptedId = encryptId(spaceId);

  const handleShareKakao = () => {
    shareKakao(
      `${window.location.protocol}//${window.location.host}/space/join/${encryptedId}`,
      `${userData.name}님이 스페이스에 초대했습니다.`,
      "어서오세용~!!",
    );
    close();
  };

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/space/join/${encryptedId}`);
      toast.success("복사 성공!!");
      close();
    } catch (e) {
      toast.error("복사 실패!!");
    }
  };

  const onInviteMember = () => {
    open({
      title: "팀원을 추가 하시겠어요?",
      contents: "링크를 복사하여 팀원을 초대할 수 있어요",
      onConfirm: handleCopyClipBoard,
      overrideActionElements: (
        <div
          css={css`
            width: 100%;
          `}
        >
          <IconButton
            onClick={handleShareKakao}
            icon="ic_kakao"
            css={css`
              background-color: #ffe400;
              color: #000000;
              transition: all 0.5s ease;
              transition-delay: 0.5s;
            `}
          >
            카카오톡 전달
          </IconButton>
          <Spacing size={0.8} />
          <IconButton
            onClick={handleCopyClipBoard}
            icon="ic_copy"
            color="#000000"
            css={css`
              background-color: #f1f5f3;
              color: #000000;
              transition: all 0.5s ease;
              transition-delay: 0.5s;
            `}
          >
            초대링크 복사
          </IconButton>
        </div>
      ),
    });
  };

  const onChangeEditType = (editType: EditType) => {
    naviagate(`/space/${spaceId}/members/edit`, { state: { editType } });
  };

  const isLeader = useMemo(() => {
    if (!data || data.length === 0) return false;

    return data[0].id === userData.memberId && data[0].isLeader;
  }, [data, userData.memberId]);

  if (isLoading) return <LoadingModal />;

  return (
    <DefaultLayout
      title="팀원"
      RightComp={
        isLeader && (
          <DropdownMenu onValueChange={(value) => onChangeEditType(value as EditType)} offset={[8, 8]}>
            <DropdownMenu.Trigger asChild={true}>
              <Typography color="gray600" variant="subtitle16SemiBold">
                편집
              </Typography>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item value={"LEADER"}>
                <Typography variant={"subtitle14SemiBold"}>대표자 변경</Typography>
              </DropdownMenu.Item>
              <DropdownMenu.Item value={"KICK"}>
                <Typography variant={"subtitle14SemiBold"} color={"red500"}>
                  팀원 삭제
                </Typography>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        )
      }
    >
      <Spacing size={0.5} />
      <Typography color="gray800" variant="body16Medium">
        {`팀원 ${data?.length}`}
      </Typography>
      <Spacing size={2.5} />
      {isLeader && <MembersItem name="팀원 추가" plus onClick={onInviteMember} />}
      {data?.map((member) => <MembersItem key={member.id} {...member} />)}
      <Spacing size={3} />
    </DefaultLayout>
  );
}
