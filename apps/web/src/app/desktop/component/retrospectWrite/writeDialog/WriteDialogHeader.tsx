import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useNavigate, useSearchParams } from "react-router-dom";

interface WriteDialogHeaderProps {
  isOverviewVisible: boolean;
  handleToggleOverview: () => void;
}

export function WriteDialogHeader({ isOverviewVisible, handleToggleOverview }: WriteDialogHeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const spaceId = searchParams.get("spaceId");

  const handleClose = () => {
    navigate(PATHS.DesktopcompleteRetrospectCreate(spaceId as string));
  };

  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        gap: 0.4rem;
      `}
    >
      <Icon
        icon="ic_close"
        size={1.8}
        css={css`
          color: ${DESIGN_TOKEN_COLOR.gray600};
          margin: 0.3rem;
          cursor: pointer;
        `}
        onClick={handleClose}
      />
      <Icon
        icon={isOverviewVisible ? "ic_expand" : "ic_shrink"}
        size={1.8}
        css={css`
          margin-left: 0.4rem;
          color: ${DESIGN_TOKEN_COLOR.gray600};
          margin: 0.3rem;
          cursor: pointer;
        `}
        onClick={handleToggleOverview}
      />
    </header>
  );
}
