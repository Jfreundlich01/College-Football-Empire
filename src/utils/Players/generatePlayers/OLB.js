import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateOLB = (age, baseStats) => {
  const stats = { ...baseStats };

  // GeneralRatings
  stats.generalRatings.Speed = getRandomInt(60, 85) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(60, 90) + getAgeMult(age);
  stats.generalRatings.Agility = getRandomInt(60, 90) + getAgeMult(age);
  stats.generalRatings.Jumping = getRandomInt(60, 90) + getAgeMult(age);

  // DefenseRatings
  stats.defenseRatings.Tackle = getRandomInt(60, 85);
  stats.defenseRatings.PowerMoves = getRandomInt(60, 85);
  stats.defenseRatings.FinesseMoves = getRandomInt(60, 85);
  stats.defenseRatings.BlockShedding = getRandomInt(60, 85);
  stats.defenseRatings.Pursuit = getRandomInt(60, 85);
  stats.defenseRatings.PlayRecognition = getRandomInt(50, 85);
  stats.defenseRatings.ManCoverage = getRandomInt(50, 75);
  stats.defenseRatings.ZoneCoverage = getRandomInt(50, 75);
  stats.defenseRatings.HitPower = getRandomInt(60, 85);
  stats.defenseRatings.Press = getRandomInt(60, 75);
  return stats;
};
