import { RetrospectType } from "@/types/write";

export type MainInfo = {
  title: string;
  introduction?: string;
};

export type Questions = { questionType: RetrospectType; questionContent: string }[];

export type RetrospectCreateReq = {
  title: string;
  introduction?: string;
  questions: Questions;
  deadline: string;
  /**
   * 기본 템플릿을 수정한 경우 true
   */
  isNewForm: boolean;
  /**
   * 기본 템플릿 질문을 유지한 채로 새로 커스텀 질문을 추가만 한 경우 false
   */
  hasChangedOriginal: boolean;
  formName?: string;
  formIntroduction?: string;
  curFormId?: number;
};
