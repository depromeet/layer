import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export type Member = {
  id: string;
  name: string;
  avatar?: string;
  isLeader?: boolean;
};

interface MemberListProps {
  members: Member[];
  onMemberClick: (member: Member) => void;
}

export function MemberList({ members, onMemberClick }: MemberListProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
      `}
    >
      {members.map((member) => (
        <MemberItem key={member.id} member={member} onClick={() => onMemberClick(member)} />
      ))}
    </div>
  );
}

interface MemberItemProps {
  member: Member;
  onClick: () => void;
}

function MemberItem({ member, onClick }: MemberItemProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        gap: 1.2rem;
        border-radius: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
      `}
    >
      <div
        css={css`
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
          background-color: ${DESIGN_TOKEN_COLOR.gray300};
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
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

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
        `}
      >
        <Typography variant="body15Medium" color="gray900">
          {member.name}
        </Typography>
      </div>
    </div>
  );
}
