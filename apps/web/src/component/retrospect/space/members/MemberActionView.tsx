import { useState } from "react";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { Member } from "./MemberList";
import { Button } from "@/component/common/button/Button";

type ViewType = "leaderChange" | "memberDelete";

interface MemberSelectionViewProps {
  members: Member[];
  currentLeaderId: number;
  onBack: () => void;
  onConfirm: (selectedId: number) => void;
  viewType: ViewType;
}

export function MemberSelectionView({ members, currentLeaderId, onBack, onConfirm, viewType }: MemberSelectionViewProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(viewType === "leaderChange" ? currentLeaderId : null);

  const handleLeaderSelect = (memberId: number) => {
    if (viewType === "leaderChange") {
      setSelectedMemberId(memberId);
    }
  };

  const handleLeaderChangeConfirm = () => {
    if (viewType === "leaderChange") {
      onConfirm(selectedMemberId as number);
    }
  };

  const handleMemberDelete = (memberId: number) => {
    if (viewType === "memberDelete") {
      onConfirm(memberId);
    }
  };

  const isConfirmDisabled = viewType === "leaderChange" && selectedMemberId === currentLeaderId;

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.6rem;
          max-height: 5.2rem;
        `}
      >
        <div
          onClick={onBack}
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 0.4rem;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
            }
          `}
        >
          <Icon icon="ic_arrow_back" size={1.4} color={DESIGN_TOKEN_COLOR.gray900} />
        </div>
        <Typography variant="title16Bold" color="gray900">
          {viewType === "leaderChange" ? "대표자 변경" : "팀원 삭제"}
        </Typography>
      </div>

      <div
        css={css`
          margin-bottom: ${viewType === "leaderChange" ? "2.5rem" : "0"};
          gap: 1.2rem;
          display: flex;
          flex-direction: column;
        `}
      >
        {members.map((member) => (
          <MemberSelectionItem
            key={member.id}
            member={member}
            isSelected={selectedMemberId === member.id}
            onLeaderSelect={() => handleLeaderSelect(member.id)}
            onMemberDelete={() => handleMemberDelete(member.id)}
            viewType={viewType}
          />
        ))}
      </div>

      {viewType === "leaderChange" && (
        <Button onClick={handleLeaderChangeConfirm} disabled={isConfirmDisabled} colorSchema="primary">
          변경하기
        </Button>
      )}
    </div>
  );
}

interface MemberSelectionItemProps {
  member: Member;
  isSelected: boolean;
  onLeaderSelect: () => void;
  onMemberDelete: () => void;
  viewType: ViewType;
}

function MemberSelectionItem({ member, isSelected, onLeaderSelect, onMemberDelete, viewType }: MemberSelectionItemProps) {
  function LeaderChangeButton({ isSelected, onLeaderSelect }: { isSelected: boolean; onLeaderSelect: () => void }) {
    return (
      <div
        onClick={onLeaderSelect}
        css={css`
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid ${isSelected ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
          background-color: ${isSelected ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.white};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        `}
      >
        {isSelected && <Icon icon="ic_check" color={DESIGN_TOKEN_COLOR.white} />}
      </div>
    );
  }

  function DeleteButton({ onMemberDelete }: { onMemberDelete: () => void }) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMemberDelete();
        }}
        css={css`
          padding: 0.6rem 1.2rem;
          border-radius: 0.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          cursor: pointer;
          transition: all 0.2s ease;
        `}
      >
        <Typography variant="body14Medium" color="gray900">
          삭제
        </Typography>
      </button>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: ${viewType === "leaderChange" ? "pointer" : "default"};
      `}
      onClick={viewType === "leaderChange" ? onLeaderSelect : undefined}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            background-color: ${DESIGN_TOKEN_COLOR.gray300};
            margin-right: 1.2rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {member.avatar && (
            <img
              src={member.avatar}
              alt={member.name}
              css={css`
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
              `}
            />
          )}
          {member.isLeader && (
            <div
              css={css`
                position: absolute;
                bottom: 0;
                right: -0.2rem;
                background-color: #343a40;
                width: 1.4rem;
                height: 1.4rem;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Icon icon="ic_crown" size={0.8} />
            </div>
          )}
        </div>
        <Typography variant="body15Medium" color="grey900">
          {member.name}
        </Typography>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {viewType === "leaderChange" ? (
          <LeaderChangeButton isSelected={isSelected} onLeaderSelect={onLeaderSelect} />
        ) : (
          <DeleteButton onMemberDelete={onMemberDelete} />
        )}
      </div>
    </div>
  );
}

interface LeaderChangeViewProps {
  members: Member[];
  currentLeaderId: number;
  onBack: () => void;
  onConfirm: (newLeaderId: number) => void;
}

export function LeaderChangeView({ members, currentLeaderId, onBack, onConfirm }: LeaderChangeViewProps) {
  return <MemberSelectionView members={members} currentLeaderId={currentLeaderId} onBack={onBack} onConfirm={onConfirm} viewType="leaderChange" />;
}

interface MemberDeleteViewProps {
  members: Member[];
  currentLeaderId: number;
  onBack: () => void;
  onDelete: (memberId: number) => void;
}

export function MemberDeleteView({ members, currentLeaderId, onBack, onDelete }: MemberDeleteViewProps) {
  // 리더는 삭제할 수 없음
  const filteredMembers = members.filter((member) => !member.isLeader);
  return (
    <MemberSelectionView members={filteredMembers} currentLeaderId={currentLeaderId} onBack={onBack} onConfirm={onDelete} viewType="memberDelete" />
  );
}
