import { useNavigate } from "react-router-dom";

import { CreateSpace } from "@/app/space/create";
import { useApiPostSpace } from "@/hooks/api/space/useApiPostSpace";
import { SpaceValue } from "@/types/space";

export function CreateSpacePage() {
  const navigate = useNavigate();
  const { mutate } = useApiPostSpace();

  const onSubmit = (spaceValue: SpaceValue) => {
    mutate(spaceValue);
    navigate("/space/create/done");
  };

  return <CreateSpace onSubmit={onSubmit} />;
}
