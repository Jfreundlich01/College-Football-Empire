import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateQB = (age, baseStats) => {
  const stats = baseStats;

  stats.generalRatings.Speed = getRandomInt(40, 100) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(40, 85) + getAgeMult(age);
  stats.ballCarrierRatings.Carrying = getRandomInt(40, 80) + getAgeMult(age);
  stats.ballCarrierRatings.Trucking = getRandomInt(40, 80) + getAgeMult(age);
  stats.ballCarrierRatings.BCVision = getRandomInt(40, 80) + getAgeMult(age);
  stats.ballCarrierRatings.StiffArm = getRandomInt(40, 70) + getAgeMult(age);
  stats.ballCarrierRatings.SpinMove = getRandomInt(40, 70) + getAgeMult(age);
  stats.ballCarrierRatings.JukeMove = getRandomInt(40, 75) + getAgeMult(age);
  stats.ballCarrierRatings.BreakTackle = getRandomInt(40, 75) + getAgeMult(age);
  stats.ballCarrierRatings.BreakSack = getRandomInt(40, 75) + getAgeMult(age);
  stats.ballCarrierRatings.ChangeOfDirection =
    getRandomInt(40, 75) + getAgeMult(age);
  stats.PasserRatings.ThrowPower = getRandomInt(40, 85) + getAgeMult(age);
  stats.PasserRatings.ThrowAccuracyShort =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.PasserRatings.ThrowAccuracyMedium =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.PasserRatings.ThrowAccuracyDeep =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.PasserRatings.ThrowontheRun = getRandomInt(40, 80) + getAgeMult(age);
  stats.PasserRatings.PlayAction = getRandomInt(40, 80) + getAgeMult(age);
  stats.PasserRatings.ThrowUnderPressure =
    getRandomInt(40, 80) + getAgeMult(age);

  return stats;
};
