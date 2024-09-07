import { atom } from "jotai";

import { AppBarProps } from "@/component/common/appBar";

export const themeAtom = atom<AppBarProps["theme"]>("dark");
