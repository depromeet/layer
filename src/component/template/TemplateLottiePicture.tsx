import Lottie from "lottie-react";
import { Fragment } from "react";

import { F, KPT, MadSadGlad, PMI, SSC, Untitled } from "@/assets/imgs/template";

export function TemplateLottiePicture({ templateId }: { templateId: number }) {
  return (
    <Fragment>
      {
        {
          10000: <Lottie animationData={KPT} />,
          10001: <Lottie animationData={F} />,
          10002: <Lottie animationData={MadSadGlad} />,
          10003: <Lottie animationData={SSC} />,
          10004: <Lottie animationData={PMI} />,
          10005: <Lottie animationData={Untitled} />,
        }[templateId]
      }
    </Fragment>
  );
}
