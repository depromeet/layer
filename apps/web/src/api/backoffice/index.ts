import { api } from "@/api";

export const postTemplateClickRecommended = async () => {
  const response = await api.post("/stats/template/click/recommended");
  return response.data;
};

export const postTemplateClickListView = async () => {
  const response = await api.post("/stats/template/click/list-view");
  return response.data;
};

export const postTemplateChoiceListView = async () => {
  const response = await api.post("/stats/template/choice/list-view");
  return response.data;
};

export const postSpacesImpression = async () => {
  const response = await api.post("/stats/spaces/impression");
  return response.data;
};

export const postSpacesClick = async (spaceId: number) => {
  const response = await api.post(`/stats/spaces/click/${spaceId}`);
  return response.data;
};

export const postRetrospectImpression = async () => {
  const response = await api.post("/stats/retrospects/impression");
  return response.data;
};

export const postRetrospectClick = async (retrospectId: number) => {
  const response = await api.post(`/stats/retrospects/click/${retrospectId}`);
  return response.data;
};
