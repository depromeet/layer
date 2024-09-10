export function calculateScaledAnswer(answerContent: string, achievementPercent: string): number {
  const parsedAnswer = parseFloat(answerContent);
  const parsedPercent = parseFloat(achievementPercent);

  if (isNaN(parsedAnswer) || isNaN(parsedPercent) || parsedPercent === 0) {
    return -1;
  }

  return parsedAnswer / parsedPercent - 1;
}
