import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

type ActionItemModifyBoxProps = {
  contents: string;
  deleteActionItems: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionItemId: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "type">;
export function ActionItemModifyBox({ actionItemId, handleChange, contents, deleteActionItems, ...props }: ActionItemModifyBoxProps) {
  return (
    <div
      css={css`
        background: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 1.5rem 1.6rem;
        width: 100%;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        column-gap: 1.2rem;
      `}
      {...props}
    >
      <Icon icon={"ic_delete"} color={DESIGN_TOKEN_COLOR.red400} size={1.8} onClick={deleteActionItems} />
      {/*<Typography variant={"body14Medium"} color={"gray900"}>*/}
      {/*</Typography>*/}
      <input
        value={contents}
        onChange={handleChange}
        css={css`
          flex-grow: 1;
        `}
      />
      <Icon
        icon="ic_handle"
        color={DESIGN_SYSTEM_COLOR.lightGrey3}
        size={"1.8rem"}
        css={css`
          margin-left: auto;
        `}
      />
    </div>
  );
}
