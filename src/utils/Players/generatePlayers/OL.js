import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateOL = (age, baseStats) => {
  const stats = { ...baseStats };

  //GeneralRatings
  stats.generalRatings.Speed = getRandomInt(40, 70) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(50, 75) + getAgeMult(age);
  stats.generalRatings.Strength = getRandomInt(60, 90) + getAgeMult(age);

  // BlockingRatings
  stats.blockingRatings.PassBlock = getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.RunBlock = getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.ImpactBlocking = getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.RunBlockPower = getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.RunBlockFinesse =
    getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.PassBlockPower = getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.PassBlockFinesse =
    getRandomInt(60, 85) + getAgeMult(age);
  stats.blockingRatings.LeadBlock = getRandomInt(60, 85) + getAgeMult(age);

  return stats;
};
