import { JoinSpace } from "@/component/space/join/JoinSpace";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function JoinSpacePage() {
  return (
    <DefaultLayout theme="gray" LeftComp={null}>
      <JoinSpace />
    </DefaultLayout>
  );
}
