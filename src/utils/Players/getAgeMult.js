import { getRandomInt } from "../getRandomInt";

export const getAgeMult = (age) => {
  const mult = (age - 18) * getRandomInt(1, 3);
  return mult;
};
