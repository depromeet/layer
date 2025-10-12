import Cookies from "js-cookie";

function isSpaceLeader(spaceId: string | number | undefined) {
  const userId = Cookies.get("memberId");
  return String(userId) === String(spaceId);
}

export { isSpaceLeader };
