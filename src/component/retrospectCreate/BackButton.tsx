import { Icon } from "@/component/common/Icon";

export function BackButton({ onClick }: { onClick: () => void }) {
  return <Icon icon={"ic_arrow_back"} size={"1.6rem"} onClick={onClick} />;
}
