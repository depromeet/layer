import { NotificationSettings } from "@/component/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function NotificationSettingsPage() {
  return (
    <DefaultLayout title="알림 설정">
      <NotificationSettings />
    </DefaultLayout>
  );
}
