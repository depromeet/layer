export function chooseParticle(word: string): string {
  if (!word || typeof word !== "string") {
    return "와";
  }

  const lastChar = word.charAt(word.length - 1);

  if (lastChar < "가" || lastChar > "힣") {
    return "와";
  }

  const hasLastConsonant = (lastChar.charCodeAt(0) - 0xac00) % 28 > 0;
  return hasLastConsonant ? "과" : "와";
}
