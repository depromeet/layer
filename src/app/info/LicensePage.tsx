import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LicensePage() {
  return (
    <DefaultLayout title="오픈 소스 라이센스">
      <Typography variant="body16Medium">{info.license}</Typography>
    </DefaultLayout>
  );
}
