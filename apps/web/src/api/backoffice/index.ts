import { api } from "@/api";

/**
 * @description 템플릿 추천 클릭 이벤트 통계를 서버에 전송합니다.
 */
export const postTemplateClickRecommended = async () => {
  const response = await api.post("/stats/template/click/recommended");
  return response.data;
};

/**
 * @description 템플릿 리스트 보기 클릭 이벤트 통계를 서버에 전송합니다.
 */
export const postTemplateClickListView = async () => {
  const response = await api.post("/stats/template/click/list-view");
  return response.data;
};

/**
 * @description 템플릿 리스트 보기 내에서 선택 이벤트 통계를 서버에 전송합니다.
 */
export const postTemplateChoiceListView = async () => {
  const response = await api.post("/stats/template/choice/list-view");
  return response.data;
};

/**
 * @description 스페이스 노출 통계를 서버에 전송합니다.
 */
export const postSpacesImpression = async () => {
  const response = await api.post("/stats/spaces/impression");
  return response.data;
};

/**
 * @description 특정 스페이스 클릭 통계를 서버에 전송합니다.
 * @param spaceId - 클릭된 스페이스의 ID
 */
export const postSpacesClick = async (spaceId: number) => {
  const response = await api.post(`/stats/spaces/click/${spaceId}`);
  return response.data;
};

/**
 * @description 회고 리스트 노출 통계를 서버에 전송합니다.
 */
export const postRetrospectImpression = async () => {
  const response = await api.post("/stats/retrospects/impression");
  return response.data;
};

/**
 * @description 특정 회고 클릭 통계를 서버에 전송합니다.
 * @param retrospectId - 클릭된 회고의 ID
 */
export const postRetrospectClick = async (retrospectId: number) => {
  const response = await api.post(`/stats/retrospects/click/${retrospectId}`);
  return response.data;
};
