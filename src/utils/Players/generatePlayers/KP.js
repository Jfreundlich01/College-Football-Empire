import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateKP = (age, baseStats) => {
  const stats = { ...baseStats };

  // KickingRatings
  stats.kickingRatings.KickPower = getRandomInt(30, 90) + getAgeMult(age);
  stats.kickingRatings.KickAccuracy = getRandomInt(30, 90) + getAgeMult(age);
  return stats;
};
