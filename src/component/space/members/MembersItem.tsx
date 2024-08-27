import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { EditType } from "@/component/space/members/MembersList";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type MembersItemProps = {
  id?: string;
  avatar?: string | null;
  name: string;
  isLeader?: boolean;
  plus?: boolean;
  editType?: EditType;
  onClick?: () => void;
  onClickEdit?: () => void;
  handleRadioChange?: () => void;
  selectedOption?: string;
  isChecked?: boolean;
};

export function MembersItem({
  id,
  selectedOption,
  avatar,
  name,
  isLeader,
  plus = false,
  editType,
  onClick,
  handleRadioChange,
  onClickEdit,
}: MembersItemProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        & + & {
          margin-top: 3rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background-color: ${plus ? DESIGN_TOKEN_COLOR.gray200 : avatar ? "transparent" : DESIGN_TOKEN_COLOR.gray300};
            margin-right: 1.8rem;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {plus ? (
            <Icon icon="ic_plus" size={1.4} color={DESIGN_TOKEN_COLOR.gray700} />
          ) : (
            <img
              src={avatar || ""}
              css={css`
                width: 5rem;
                height: 5rem;
                &[src=""] {
                  display: none;
                }
              `}
            />
          )}
          {isLeader && (
            <div
              css={css`
                position: absolute;
                bottom: 0;
                right: -0.4rem;
                background-color: #343a40;
                width: 1.7rem;
                height: 1.7rem;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Icon icon="ic_crown" size={0.9} />
            </div>
          )}
        </div>
        <Typography variant={DESIGN_TOKEN_TEXT.subtitle18SemiBold} color={DESIGN_SYSTEM_COLOR.grey900}>
          {name}
        </Typography>
      </div>
      <div>
        {editType &&
          {
            KICK: !isLeader && (
              <button
                onClick={onClickEdit}
                css={css`
                  height: 3.6rem;
                  padding: 0 2rem;
                  background-color: ${DESIGN_TOKEN_COLOR.gray100};
                  border-radius: 0.8rem;
                `}
              >
                <Typography variant={DESIGN_TOKEN_TEXT.body14Medium} color={DESIGN_TOKEN_COLOR.gray900}>
                  삭제
                </Typography>
              </button>
            ),
            LEADER: (
              // FIXME: 공통 컴포넌트로 뺄 예정
              <div
                onClick={handleRadioChange}
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <input
                  checked={selectedOption === id}
                  css={css`
                    display: none;
                  `}
                />
                <CustomRadio checked={selectedOption === id}>
                  {selectedOption === id && <Icon icon="ic_check" color={DESIGN_TOKEN_COLOR.gray00} />}
                </CustomRadio>
              </div>
            ),
          }[editType]}
      </div>
    </div>
  );
}

const CustomRadio = styled.div<{ checked: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.checked ? "#6A8FF7" : "#E0E0E0")};
  background-color: ${(props) => (props.checked ? "#6A8FF7" : "#FFFFFF")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
`;
