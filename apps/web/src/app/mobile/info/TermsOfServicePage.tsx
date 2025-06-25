import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function TermsOfServicePage() {
  return (
    <DefaultLayout title="이용약관">
      <Typography variant="body16Medium">
        <pre
          css={css`
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
          `}
        >
          {info.termsOfService}
        </pre>
      </Typography>
    </DefaultLayout>
  );
}
