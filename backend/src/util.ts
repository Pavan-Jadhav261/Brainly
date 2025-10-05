export const random = (num: number) => {
  const options = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let ans: string = "";
  for (let i = 0; i < num; i++) {
    ans = ans + options[Math.floor(Math.random() * options.length)];
  }
  return ans;
};
