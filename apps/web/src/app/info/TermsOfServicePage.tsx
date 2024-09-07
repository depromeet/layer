import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function TermsOfServicePage() {
  return (
    <DefaultLayout title="이용약관">
      <Typography variant="body16Medium">{info.termsOfService}</Typography>
    </DefaultLayout>
  );
}
