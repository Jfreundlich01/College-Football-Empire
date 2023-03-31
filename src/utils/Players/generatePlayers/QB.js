import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateQB = (age, baseStats) => {
  const stats = { ...baseStats };

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
  stats.passerRatings.ThrowPower = getRandomInt(40, 85) + getAgeMult(age);
  stats.passerRatings.ThrowAccuracyShort =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.passerRatings.ThrowAccuracyMedium =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.passerRatings.ThrowAccuracyDeep =
    getRandomInt(40, 80) + getAgeMult(age);
  stats.passerRatings.ThrowontheRun = getRandomInt(40, 80) + getAgeMult(age);
  stats.passerRatings.PlayAction = getRandomInt(40, 80) + getAgeMult(age);
  stats.passerRatings.ThrowUnderPressure =
    getRandomInt(40, 80) + getAgeMult(age);

  return stats;
};
