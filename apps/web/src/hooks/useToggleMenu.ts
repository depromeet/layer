import { useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import useClickOutside from "./useClickOutside";

const clickPositionAtom = atom({ top: 0, left: 0, right: 0, height: 0 });
const toggleMenuStateAtom = atom(false);
const activeItemIdAtom = atom("");

export default function useToggleMenu() {
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [isShowMenu, setIsShowMenu] = useAtom(toggleMenuStateAtom);
  const [clickPosition, setClickPosition] = useAtom(clickPositionAtom);
  const [activeItemId, setActiveItemId] = useAtom(activeItemIdAtom);

  useClickOutside(toggleRef, () => {
    hideMenu();
  });

  const showMenu = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      height: rect.height,
    });
    setIsShowMenu((prev) => !prev);
  };

  const hideMenu = () => {
    setIsShowMenu(false);
    setActiveItemId("");
  };

  return {
    toggleRef,
    isShowMenu,
    showMenu,
    hideMenu,
    clickPosition,

    activeItemId,
    setActiveItemId,
  };
}
