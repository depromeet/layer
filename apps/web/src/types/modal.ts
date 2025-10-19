import { ReactNode } from "react";

export type ModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode | string;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert";
    buttonText?: string[];
    autoClose?: boolean;
    enableHeader?: boolean;
    enableFooter?: boolean;
    needsBackButton?: boolean;
    disabledClose?: boolean;
    backButtonCallback?: () => void;
    footerLeftCallback?: () => void;
  };
};

/**
 * retrospectCreate: 회고 생성
 * recommendTemplate: 회고 템플릿 추천
 * listTemplate: 회고 템플릿 리스트
 * listTemplateDetail: 회고 템플릿 리스트 상세
 * retrospectWrite: 회고 작성
 */

type FunnelStep = "retrospectCreate" | "recommendTemplate" | "listTemplate" | "listTemplateDetail" | "retrospectWrite";

export type FunnelModalType = {
  isOpen: boolean;
  title: string;
  step: FunnelStep | null;
  contents: ReactNode | string;
  templateTag?: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export type ActionModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode | string;
  onClose?: () => void;
  onConfirm?: () => void;
};
