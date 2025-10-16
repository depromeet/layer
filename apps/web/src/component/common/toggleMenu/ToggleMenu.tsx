import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "../Portal";
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import useToggleMenu from "@/hooks/useToggleMenu";
import React, { ComponentProps, useEffect, useState } from "react";
import { Typography } from "../typography";
import { Icon } from "../Icon";
import { IconType } from "../Icon/Icon";

interface ToggleMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent) => void;
  icon?: IconType;
  variant?: keyof typeof DESIGN_TOKEN_TEXT;
  color?: keyof typeof DESIGN_TOKEN_COLOR;
  children?: string;
}

function ToggleMenuButton({ onClick, variant = "subtitle14SemiBold", children, icon, color, ...props }: ToggleMenuButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1.3rem 2rem;
        column-gap: 1rem;
        text-align: left;

        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
      {...props}
    >
      {icon && <Icon icon={icon} size={1.6} />}
      <Typography variant={variant} color={color}>
        {children}
      </Typography>
    </button>
  );
}

type ToggleMenuChild = React.ReactElement<ComponentProps<typeof ToggleMenuButton>>;
export function ToggleMenu({ children }: { children: ToggleMenuChild | ToggleMenuChild[] }) {
  const { toggleRef, isShowMenu, clickPosition } = useToggleMenu();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuSize, setMenuSize] = useState({ width: 165, height: 100 });

  useEffect(() => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const click = clickPosition;
    const menu = menuSize;

    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2 + 200;

    let top = click.top;
    let left = click.left;

    if (click.top < centerY) {
      top = click.top + click.height + 10;
    } else {
      top = click.top - menu.height - 10;
    }

    if (click.left < centerX) {
      left = click.left;
    } else {
      left = click.right - menu.width;
    }

    if (left + menu.width > viewport.width) {
      left = viewport.width - menu.width - 10;
    }
    if (left < 0) {
      left = 10;
    }
    if (top + menu.height > viewport.height) {
      top = viewport.height - menu.height - 10;
    }
    if (top < 0) {
      top = 10;
    }

    setMenuPosition({ top, left });
  }, [isShowMenu, clickPosition, menuSize]);

  const handleMenuRef = (node: HTMLDivElement | null) => {
    if (node && toggleRef) {
      toggleRef.current = node;

      const rect = node.getBoundingClientRect();
      setMenuSize({
        width: rect.width || 165,
        height: rect.height || 100,
      });
    }
  };

  return (
    <AnimatePresence>
      <Portal id="toggle-root">
        <motion.div
          ref={handleMenuRef}
          initial={{
            opacity: 0,
            y: clickPosition.top < window.innerHeight / 2 ? 10 : -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: clickPosition.top < window.innerHeight / 2 ? 10 : -10,
          }}
          transition={{ duration: 0.3 }}
          css={css`
            position: fixed;
            top: ${menuPosition.top}px;
            left: ${menuPosition.left}px;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            border: none;
            border-radius: 1rem;
            box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
            z-index: 9999;
            width: 16.5rem;
            min-height: auto;
            overflow: hidden;
          `}
        >
          {children}
        </motion.div>
      </Portal>
    </AnimatePresence>
  );
}

ToggleMenu.Button = ToggleMenuButton;
