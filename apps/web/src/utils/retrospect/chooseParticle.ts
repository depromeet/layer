export function chooseParticle(word: string): string {
  const lastChar = word.charAt(word.length - 1);
  const hasLastConsonant = (lastChar.charCodeAt(0) - 0xac00) % 28 > 0;
  return hasLastConsonant ? "과" : "와";
}
