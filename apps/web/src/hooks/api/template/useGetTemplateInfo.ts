import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";

type InfoReponse = {
  id: number;
  createdAt: string;
  introduction: string;
  templateDetailQuestionList: {
    description: string;
    question: string;
    questionId: number;
  }[];
  templatePurposeResponseList: {
    id: number;
    purpose: string;
  }[];
  templateImageUrl: string;
  templateName: string;
  tipDescription: string;
  tipTitle: string;
  title: string;
};

export type TemplatePurposeType = InfoReponse["templatePurposeResponseList"][number];
export type TemplateQuestionType = InfoReponse["templateDetailQuestionList"][number];

export const useGetTemplateInfo = ({ templateId }: { templateId: number }) => {
  const getTemplateInfo = () => {
    const res = api.get<InfoReponse>(`/api/template/${templateId}/detail-info`).then((res) => res.data);
    return res;
  };

  return useSuspenseQuery({
    queryFn: () => getTemplateInfo(),
    queryKey: ["templateInfo", templateId],
    refetchOnWindowFocus: false,
  });
};
