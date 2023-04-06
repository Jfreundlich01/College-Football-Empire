import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateMLB = (age, baseStats) => {
  const stats = { ...baseStats };

  // GeneralRatings
  stats.generalRatings.Speed = getRandomInt(70, 85) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Agility = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Jumping = getRandomInt(70, 90) + getAgeMult(age);

  // ReceivingRatings
  stats.receivingRatings.Catching = getRandomInt(30, 75) + getAgeMult(age);
  stats.receivingRatings.SpectacularCatch =
    getRandomInt(30, 75) + getAgeMult(age);
  stats.receivingRatings.Release = getRandomInt(30, 75) + getAgeMult(age);
  stats.receivingRatings.CatchinTraffic =
    getRandomInt(30, 75) + getAgeMult(age);

  // DefenseRatings
  stats.defenseRatings.Tackle = getRandomInt(50, 85);
  stats.defenseRatings.PowerMoves = getRandomInt(50, 65);
  stats.defenseRatings.FinesseMoves = getRandomInt(50, 65);
  stats.defenseRatings.BlockShedding = getRandomInt(50, 75);
  stats.defenseRatings.Pursuit = getRandomInt(60, 85);
  stats.defenseRatings.PlayRecognition = getRandomInt(60, 85);
  stats.defenseRatings.ManCoverage = getRandomInt(50, 80);
  stats.defenseRatings.ZoneCoverage = getRandomInt(50, 85);
  stats.defenseRatings.HitPower = getRandomInt(50, 85);
  stats.defenseRatings.Press = getRandomInt(60, 85);

  return stats;
};
