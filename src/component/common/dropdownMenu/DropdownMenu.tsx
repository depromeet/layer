import { css } from "@emotion/react";
import { Placement } from "@popperjs/core";
import { OffsetModifier } from "@popperjs/core/lib/modifiers/offset";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type DropdownMenuContextState = {
  isOpen: boolean;
  toggle: () => void;
  onSelect: (value: string) => void;
  setPopperEl: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  popperStyles: ReturnType<typeof usePopper>["styles"]["popper"];
  popperAttributes: ReturnType<typeof usePopper>["attributes"]["popper"];
};

const DropdownMenuContext = createContext<DropdownMenuContextState | undefined>(undefined);

type DropdownMenuProps = {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  placement?: Placement;
  modifiers?: Partial<OffsetModifier>[];
  offset?: [number, number];
};

export function DropdownMenu({ children, onValueChange, placement = "bottom-end", offset = [20, 11.5], modifiers = [] }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceEl, setReferenceEl] = useState<HTMLDivElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      ...modifiers,
    ],
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (referenceEl?.contains(e.target as Node) || popperEl?.contains(e.target as Node)) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [referenceEl, popperEl]);

  return (
    <DropdownMenuContext.Provider
      value={{
        setPopperEl,
        onSelect: onValueChange,
        isOpen,
        toggle: () => setIsOpen(!isOpen),
        popperStyles: styles.popper,
        popperAttributes: attributes.popper,
      }}
    >
      <div
        ref={(el) => setReferenceEl(el)}
        css={css`
          position: relative;
          width: 2rem;
          height: 2rem;
        `}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function Trigger({ asChild, children }: { asChild: true; children: React.ReactNode } | PropsWithChildren<{ asChild?: false }>) {
  const context = useContext(DropdownMenuContext);
  return <button onClick={() => context?.toggle()}>{asChild ? children : <Icon icon={"ic_more"} color={DESIGN_TOKEN_COLOR.gray600} />}</button>;
}

function Content({ children }: { children: React.ReactNode }) {
  const context = useContext(DropdownMenuContext);
  if (!context?.isOpen) return null;
  return (
    <Portal id="dropdown-root">
      <div
        ref={(el) => context.setPopperEl(el)}
        css={css`
          display: flex;
          flex-direction: column;
          position: absolute;
          bottom: 0;
          z-index: 10001;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-radius: 0.8rem;
          box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
          animation: ${ANIMATION.FADE_IN} 0.2s ease-in-out;
        `}
        style={context.popperStyles}
        {...context.popperAttributes}
      >
        {children}
      </div>
    </Portal>
  );
}

function Item({ children, value }: { children: React.ReactNode; value: string }) {
  const context = useContext(DropdownMenuContext);
  return (
    <button
      css={css`
        padding: 1.2rem 2rem;
        text-align: left;
      `}
      onClick={(e) => {
        e.stopPropagation();
        context?.onSelect(value);
        context?.toggle();
      }}
    >
      {children}
    </button>
  );
}

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Item = Item;
