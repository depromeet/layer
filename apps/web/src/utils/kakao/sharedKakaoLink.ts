/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY as string;

export const shareKakaoWeb = (route: string, title: string, content?: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_KEY);
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: content,
        imageUrl: "https://kr.object.ncloudstorage.com/layer-bucket/small_banner.png",
        link: {
          mobileWebUrl: route,
          webUrl: route,
        },
      },
      buttons: [
        {
          title: "초대 받기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],
    });
  }
};
