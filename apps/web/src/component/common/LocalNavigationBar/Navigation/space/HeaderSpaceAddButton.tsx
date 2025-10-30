import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useNavigation } from "../../context/NavigationContext";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import AddSpacePage from "@/app/desktop/space/add/AddSpacePage";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useRetrospectCreateReset } from "@/hooks/store/useRetrospectCreateReset";
import { useSpaceCreateReset } from "@/hooks/store/useSpaceCreateReset";
import Tooltip from "@/component/common/Tooltip";

export default function HeaderSpaceAddButton() {
  const { isCollapsed } = useNavigation();
  const { open: openDesktopModal } = useDesktopBasicModal();
  const { resetAll: resetRetrospectInfo } = useRetrospectCreateReset();
  const { resetAll: resetSpaceInfo } = useSpaceCreateReset();

  const handleOpenSpaceAdd = () => {
    openDesktopModal({
      title: "",
      contents: <AddSpacePage />,
      options: {
        enableFooter: false,
      },
      onClose: () => {
        resetRetrospectInfo();
        resetSpaceInfo();
      },
    });
  };

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 0.4rem;

        ${isCollapsed
          ? css`
              justify-content: center;
              padding-left: 0;
            `
          : css`
              justify-content: space-between;
              padding-left: 0.8rem;
            `}
      `}
    >
      <Typography
        variant="subtitle16SemiBold"
        color="gray900"
        css={css`
          overflow: hidden;
          white-space: nowrap;
          transition: opacity 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                display: none;
                width: 0;
                opacity: 0;
                visibility: hidden;
              `
            : css`
                display: block;
                width: auto;
                opacity: 1;
                visibility: visible;
              `}
        `}
      >
        내 스페이스
      </Typography>
      <Tooltip placement="right">
        <Tooltip.Trigger asChild>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 3.2rem;
              height: 3.2rem;
              padding: 0.7rem;
              cursor: pointer;
              transition: background-color 0.2s ease-in-out;
              border-radius: 0.8rem;

              &:hover {
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
              }
            `}
            onClick={handleOpenSpaceAdd}
          >
            <Icon icon="ic_plus" size={1.6} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Typography variant="body12Medium" color="gray00">
            스페이스 추가
          </Typography>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
