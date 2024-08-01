import { CreateSpace } from "@/component/space";
import { useApiPostSpace } from "@/hooks/api/space/useApiPostSpace";

export function CreateSpacePage() {
  const { mutate, isPending } = useApiPostSpace();

  if (isPending) return null; // FIXME: 로딩 화면

  return <CreateSpace onSubmit={mutate} />;
}
