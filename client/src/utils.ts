export const startInterval = (seconds: number, callback: () => void) => {
  callback();
  return setInterval(callback, seconds * 1000);
};
