import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import useClickOutside from "./useClickOutside";

const clickPositionAtom = atom({ top: 0, left: 0, right: 0, height: 0 });
const openInstanceAtom = atom<symbol | null>(null);

export default function useToggleMenu() {
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [clickPosition, setClickPosition] = useAtom(clickPositionAtom);
  const [openInstanceId, setOpenInstanceId] = useAtom(openInstanceAtom);
  const instanceId = useRef(Symbol()).current;
  const isShowMenu = openInstanceId === instanceId;

  const showMenu = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      height: rect.height,
    });
    setOpenInstanceId((prev) => (prev === instanceId ? null : instanceId));
  };

  const hideMenu = () => {
    setOpenInstanceId(null);
  };

  useClickOutside(toggleRef, () => {
    if (openInstanceId !== instanceId) {
      setOpenInstanceId(null);
    }
  });

  useEffect(() => {
    return () => {
      setOpenInstanceId((prev) => (prev === instanceId ? null : prev));
    };
  }, [instanceId, setOpenInstanceId]);

  return {
    toggleRef,
    isShowMenu,
    showMenu,
    hideMenu,
    clickPosition,
  };
}
