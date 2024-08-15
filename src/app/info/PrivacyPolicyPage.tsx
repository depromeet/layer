import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function PrivacyPolicyPage() {
  return (
    <DefaultLayout title="개인정보 처리방침">
      <Typography variant="body16Medium">{info.privacyPolicy}</Typography>
    </DefaultLayout>
  );
}
