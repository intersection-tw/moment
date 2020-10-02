export const isMobile = () => {
  if (typeof navigator !== `undefined`) return (/Mobi|Android/i.test(navigator.userAgent));
};
