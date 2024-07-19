import { Interpolation, Theme } from "@emotion/react";

import { Icon } from "@/component/common/Icon";

type DeleteItemButtonProps = {
  onClick: () => void;
  styles?: Interpolation<Theme>;
};

export function DeleteItemButton({ onClick, styles }: DeleteItemButtonProps) {
  return (
    <button css={[styles]} onClick={onClick}>
      <Icon icon={"ic_delete_pink"} />
    </button>
  );
}
