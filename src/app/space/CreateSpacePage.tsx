import { CreateSpace } from "@/component/space";
import { useApiPostSpace } from "@/hooks/api/space/useApiPostSpace";

export function CreateSpacePage() {
  const { mutate } = useApiPostSpace();

  return <CreateSpace onSubmit={mutate} />;
}
