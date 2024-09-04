export const getRandomID = () => String(new Date().getTime());

export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};
