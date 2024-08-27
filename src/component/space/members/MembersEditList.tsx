import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ButtonProvider } from "@/component/common/button";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { MembersItem } from "@/component/space/members/MembersItem";
import { EditType } from "@/component/space/members/MembersList";
import { useChangeLeader } from "@/hooks/api/space/members/useApiChangeLeader";
import { useApiGetMemers } from "@/hooks/api/space/members/useApiGetMembers";
import { useApiKickMember } from "@/hooks/api/space/members/useApiKickMembers";
import { useModal } from "@/hooks/useModal";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";

export function MembersEditList() {
  const { spaceId } = useParams() as { spaceId: string };
  const { editType } = useLocation().state as { editType: EditType };
  const { data, isLoading } = useApiGetMemers(spaceId);
  const { mutate: kickMember } = useApiKickMember(spaceId);
  const { mutate: changeLeader } = useChangeLeader(spaceId);
  const { open } = useModal();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (data) {
      setSelectedOption(data[0].id);
    }
  }, [data]);

  const onClickEdit = (memberId: string) => {
    open({
      title: "팀원을 삭제하시겠어요?",
      contents: "삭제하시면 다시 되돌릴 수 없어요",
      onConfirm: () => kickMember({ spaceId, memberId }),
      options: {
        buttonText: ["취소", "삭제"],
      },
    });
  };

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const onChangeLeader = () => {
    open({
      title: "대표자를 변경하시겠어요?",
      contents: "대표자를 변경하면\n팀 스페이스 관리 권한이 변경돼요",
      onConfirm: () => changeLeader({ spaceId, memberId: selectedOption }),
      options: {
        buttonText: ["취소", "변경"],
      },
    });
  };

  if (isLoading) return <LoadingModal />;

  return (
    <DefaultLayout title={editType === "LEADER" ? "대표자 변경" : "팀원 추방"}>
      <Spacing size={0.5} />
      <Typography color={DESIGN_TOKEN_COLOR.gray800} variant={DESIGN_TOKEN_TEXT.body16Medium}>
        {`팀원 ${data?.length}`}
      </Typography>
      <Spacing size={2.5} />
      {data?.map((member) => (
        <MembersItem
          key={member.id}
          editType={editType}
          onClickEdit={() => onClickEdit(member.id)}
          handleRadioChange={() => handleRadioChange(member.id)}
          selectedOption={selectedOption}
          {...member}
        />
      ))}
      {editType === "LEADER" && (
        <ButtonProvider>
          <ButtonProvider.Primary onClick={onChangeLeader} disabled={!selectedOption || data![0].id === selectedOption}>
            변경
          </ButtonProvider.Primary>
        </ButtonProvider>
      )}
    </DefaultLayout>
  );
}
