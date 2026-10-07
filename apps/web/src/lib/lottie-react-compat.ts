import * as LottieNamespace from "lottie-react";

import { resolveDefaultExport } from "@/lib/resolveDefaultExport";

type LottieComponent = typeof import("lottie-react").default;

export const Lottie = resolveDefaultExport<LottieComponent>(LottieNamespace);
