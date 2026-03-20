import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";

function isSpaceLeader(spaceId: string | number | undefined) {
  const userId = Cookies.get(COOKIE_KEYS.memberId);
  return String(userId) === String(spaceId);
}

export { isSpaceLeader };
