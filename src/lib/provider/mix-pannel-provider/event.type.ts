import { RecommendTemplateResponse } from "@/app/retrospect/template/recommend/RecommendTemplatePage";
import { RetrospectCreateReq } from "@/types/retrospectCreate";
import { SpaceValue } from "@/types/space";

export type TrackFunction = <T extends keyof EVENTS_TO_PROPERTIES>(eventName: T, properties: EVENTS_TO_PROPERTIES[T]) => void;

type EVENTS_TO_PROPERTIES = {
  SIGN_UP: {
    memberId: number;
  };

  SPACE_CREATE: Omit<SpaceValue, "step">;

  RETROSPECT_CREATE_START: { spaceId: number };
  RETROSPECT_CREATE_MAININFO: { titleLength: number; introLength: number };
  RETROSPECT_CREATE_EDIT_QUESTIONS: Pick<RetrospectCreateReq, "hasChangedOriginal"> & { questions: string[] };
  RETROSPECT_CREATE_DONE: {
    templateId: number;
    spaceId: number;
    title: string;
    deadline: string;
  };

  TEMPLATE_RECOMMEND: Omit<RecommendTemplateResponse, "formImageUrl">;

  WRITE_START: {
    retrospectId: number;
    spaceId: number;
  };

  WRITE_DONE: {
    retrospectId: number;
    spaceId: number;
    answerLengths: number[];
    averageAnswerLength: number;
  };

  RESULT_ANALYSIS_VIEW: {
    retrospectId: number;
    spaceId: number;
  };
};
