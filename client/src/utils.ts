export const startInterval = (seconds: number, callback: () => void) => {
  callback();
  return setInterval(callback, seconds * 1000);
};

export const registerUser = (currentUser: any) => {
  console.log(currentUser);
};
