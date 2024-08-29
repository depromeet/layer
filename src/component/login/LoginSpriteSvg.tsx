import { loginType } from "@/types/loginType";

const SvgSprite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
    <defs>
      <symbol id="kakao" width="18" height="20" fill="none" viewBox="0 0 18 20">
        <path fill="url(#patternKakao)" d="M0 .833h18v18.333H0z" />
        <defs>
          <pattern id="patternKakao" width="1" height="1" patternContentUnits="objectBoundingBox">
            <use href="#imageKakao" transform="scale(.01852 .01818)" />
          </pattern>
          <image
            id="imageKakao"
            width="54"
            height="55"
            data-name="logoKakao.png"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAORSURBVHgB7ZpbiE1RHMY/BhHGFBnFaORFpjQyowZh8CJGecKDByUPSB48eKEoubxIEUrJg1tCEYVk0tDkUm7j1mAal4YxLoNxn/F9/ntOxzFnzt7n7Dnn7N189WvO2WfN6Xx7rf/aa/3/C+hWt7rVleoB/5RD8skwUkgKyHDnWv+Ytl/Ia/KS1JNnzvs35Dd8UKrG+pIxZDKZAjOU71z3ohaYsTpymVSTR+QbklSyxkaSmWQeKSID4K8+kxpyilyE9aoneTWWR5aQRWQE0qMX5DDZTz64/Se3xgaRhWQpLG4yIcXjPnKEfEzU2I2xCWQ9KYG/k00yaiM3yEZys7OGOZ18JhOKoV1kNDJvCs5v0IiZDRuij+M1jGesF1lMtpCByD71I7NgMadJpjW2QUfGepN1ZI3zOlulmz+D5JIqxJiLNaauXk2Wk57Ifun3FsNirzr6g1hjFWQD7G4ERTJXSmoRFXPRE4KC8gwZimBKy7E5sMfCPz2miaIEwZXWo+oUdU4kjjROKxB8zYV5iRhbhmDFVTzJg7z8jbHB5Brs2RAGaUdQqh4rR3hMSdoylcvYJIRPZTI2FuFTkYyla1+VThXIWC7Cp4Ey1orwqU3GmhE+NcvYc4RP9TJ2D+FTjYxVIXy6ImNXYZnZsEheqmSsiZxDeHSeNLWv7neS7wi+fsC8RLYtD8kxBF/y8EAvolMDQ8hZBHeJpTyjUgONehOdGlDFo9b5MGibzq9kJbnffiE2S1XnNFJJKAjpN+kn2URORl/sKGF6y/k7Edlv7hfZTvbAcosRdWRMDa7Dek75umzNBit0tpHdcJnihtNQVQ2VUJWS87uwl6oayFpyCHF2JzkJvkDl0kpYBVNkemiqPl1JVsFWTHHltjSkZM98soKMQmakGXsvbJJoSdTYa81rASxY0yUNsyfkKDkOK8C7ktfnVTHSo7fkLjkBO0XQCI/yYky9OxX+S7OwasqaELQcukTukKew6TwpeTFW6OBWWlRr16BthBJGfWCTjzK1Ou6gXnkFWxQ0OLyHT/JiTL3lNiZVp9pKLiCFu56KvBib5qKNHuoK9B3wEOhdIbfGNIwSpcK1AN0Me874ch4qFbk1Nh7xE6uKoYOwYxOeZ6+ukltj8YbhbVgv/Ve1z7TcGpse8/4TOQBbVb9DQKXCoE6faWpW4fo0KUN2nNRJSTpuVAebHHSoJQ8hUfuKYxwC1Et/APkPqj305KbSAAAAAElFTkSuQmCC"
          />
        </defs>
      </symbol>

      <symbol id="google" width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path fill="url(#patternGoogle)" d="M0 0h18v18H0z" />
        <defs>
          <pattern id="patternGoogle" width="1" height="1" patternContentUnits="objectBoundingBox">
            <use href="#imageGoogle" transform="scale(.01852)" />
          </pattern>
          <image
            id="imageGoogle"
            width="54"
            height="54"
            data-name="logoGoogle.png"
            href="data:image/png;base64,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"
          />
        </defs>
      </symbol>
    </defs>
  </svg>
);

export function LoginSpriteSvg({ type }: loginType) {
  return (
    <div>
      <SvgSprite />
      <svg width="18" height="18">
        <use xlinkHref={`#${type}`} />
      </svg>
    </div>
  );
}
