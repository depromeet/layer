import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/config/storage-keys";

const INTERNAL_TEAM_USER_IDS = [146, 147, 149, 150, 153, 156, 157, 158, 185, 260, 837, 845, 855, 917];

function isSpaceLeader(spaceId: string | number | undefined) {
  const userId = Cookies.get(COOKIE_KEYS.memberId);
  return String(userId) === String(spaceId);
}

function isInternalUser() {
  const userId = Number(Cookies.get(COOKIE_KEYS.memberId));
  return INTERNAL_TEAM_USER_IDS.includes(userId);
}

export { isSpaceLeader, isInternalUser };
