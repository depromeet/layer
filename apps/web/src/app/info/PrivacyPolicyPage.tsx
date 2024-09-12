import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function PrivacyPolicyPage() {
  return (
    <DefaultLayout title="개인정보 처리방침">
      <Typography variant="body16Medium">
        <pre
          css={css`
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
          `}
        >
          {info.privacyPolicy}
        </pre>
      </Typography>
    </DefaultLayout>
  );
}
