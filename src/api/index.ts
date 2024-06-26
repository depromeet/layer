import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/** API 사용 전, ENV 파일을 통해 서버 연동 설정을 해주세요 */
const API_URL = import.meta.env.VITE_API_URL as string;

const baseApi = axios.create({
    baseURL: API_URL,
    timeout: 5000,

    headers: {
        "Content-Type": "application/json",
    },
});

/** 개발 환경에서만 실행되논 로깅 함수 */
const logOnDev = (message: string) => {
    if (import.meta.env.MODE === "development") {
        console.log(message);
    }
};

/** API 요청이 실패한 경우 호출되는 함수 */
const onError = (status: number, message: string) => {
    const error = { status, message };
    throw error;
};

/** request 요청 시, config 객체를 받아와 처리하는 함수 */
const onRequest = (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const { method, url, headers = {} } = config;

    headers.Authorization = token ? `Bearer ${token}` : "";
    logOnDev(`[API REQUEST] ${method?.toUpperCase()} ${url}`);
    return Promise.resolve({ ...config, headers } as InternalAxiosRequestConfig);
};

/** request 요청 시, 발생하는 에러를 처리하는 함수 */
const onErrorRequest = (error: AxiosError<AxiosRequestConfig>) => {
    const { status } = error?.response as AxiosResponse;

    if (error?.config) {
        onError(status, "에러: 요청 실패");
    } else if (error?.request) {
        onError(status, "에러: 응답 없음");
    } else {
        onError(status, "에러:");
    }

    return Promise.reject(error);
};

/** 응답이 성공적으로 수신되었을 때, 호출되는 콜백 함수 */
const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(`[API RESPONSE ${status}] ${method?.toUpperCase()} ${url}`);
    return response;
};

/** 응답이 실패한 API 요청에 대한 로깅 및 에러 코드 처리를 담당하는 함수 */
const onErrorResponse = (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
        const { message } = error;
        const { method, url } = error?.config as AxiosRequestConfig;
        const { status, statusText } = error?.response as AxiosResponse;

        logOnDev(`[API ERROR_RESPONSE ${status} | ${statusText} | ${message}] ${method?.toUpperCase()} ${url}`);

        switch (status) {
            case 400:
                onError(status, "잘못된 요청을 했어요");
                break;
            case 401: {
                onError(status, "인증을 실패했어요");
                break;
            }
            case 403: {
                onError(status, "권한이 없는 상태로 접근했어요");
                break;
            }
            case 404: {
                onError(status, "찾을 수 없는 페이지를 요청했어요");
                break;
            }
            case 500: {
                onError(status, "서버 오류가 발생했어요");
                break;
            }
            default: {
                onError(status, `기타 에러가 발생했어요 : ${error?.message}`);
            }
        }
    } else if (error instanceof Error && error?.name === "TimoutError") {
        logOnDev(`[API TIME_ERROR] ${error?.toString()}`);
        onError(0, "요청 시간이 초과되었어요");
    } else {
        logOnDev(`[API ETC_ERROR] ${error?.toString()}`);
        onError(0, `기타 에러가 발생했어요 : ${error?.toString()}`);
    }

    return Promise.reject(error);
};

/** 인터셉터를 설정 하고, Axios Instance를 반환하는 함수 */
const setInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
    axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

    return axiosInstance;
};

export const api = setInterceptors(baseApi);