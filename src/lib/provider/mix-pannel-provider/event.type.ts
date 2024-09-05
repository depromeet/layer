import { RecommendTemplateResponse } from "@/app/retrospect/template/recommend/RecommendTemplatePage";
import { RetrospectCreateReq } from "@/types/retrospectCreate";
import { SpaceValue } from "@/types/space";

export type TrackEvent<T extends Events["event"]> = Extract<Events, { event: T }>["args"];

export type TrackFunction = <T extends Events["event"]>(eventName: T, args: TrackEvent<T>) => void;

type Events =
  | WRITE_DONE
  | WRITE_START
  | TEMPLATE_RECOMMEND
  | RETROSPECT_CREATE_DONE
  | RETROSPECT_CREATE_EDIT_QUESTIONS
  | RETROSPECT_CREATE_MAININFO
  | RETROSPECT_CREATE_START
  | SPACE_CREATE
  | SIGN_UP;

type SIGN_UP = { event: "SIGN_UP"; args: { memberId: number } };

type SPACE_CREATE = { event: "SPACE_CREATE"; args: Omit<SpaceValue, "step"> };

type RETROSPECT_CREATE_START = { event: "RETROSPECT_CREATE_START"; args: object };
type RETROSPECT_CREATE_MAININFO = { event: "RETROSPECT_CREATE_MAININFO"; args: { titleLength: number; introLength: number } };
type RETROSPECT_CREATE_EDIT_QUESTIONS = {
  event: "RETROSPECT_CREATE_EDIT_QUESTIONS";
  args: Pick<RetrospectCreateReq, "hasChangedOriginal"> & { questions: string[] };
};
type RETROSPECT_CREATE_DONE = {
  event: "RETROSPECT_CREATE_DONE";
  args: {
    templateId: number;
    spaceId: number;
    title: string;
    deadline: string;
  };
};

type TEMPLATE_RECOMMEND = {
  event: "TEMPLATE_RECOMMEND";
  args: Omit<RecommendTemplateResponse, "formImageUrl">;
};

type WRITE_START = {
  event: "WRITE_START";
  args: {
    retrospectId: number;
    spaceId: number;
  };
};
type WRITE_DONE = {
  event: "WRITE_DONE";
  args: {
    retrospectId: number;
    spaceId: number;
    answerLengths: number[];
    averageAnswerLength: number;
  };
};
