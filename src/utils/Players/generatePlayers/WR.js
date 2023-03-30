import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateWR = (age, baseStats) => {
  const stats = { ...baseStats };

  stats.generalRatings.Speed = getRandomInt(70, 100) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Agility = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Jumping = getRandomInt(70, 90) + getAgeMult(age);
  stats.receivingRatings.Catching = getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.SpectacularCatch =
    getRandomInt(70, 80) + getAgeMult(age);
  stats.receivingRatings.Release = getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.CatchinTraffic =
    getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.RunAfterCatch = getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.ShortRouteRunning =
    getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.MediumRouteRunning =
    getRandomInt(70, 85) + getAgeMult(age);
  stats.receivingRatings.DeepRouteRunning =
    getRandomInt(70, 85) + getAgeMult(age);
  stats.kickingRatings.kickReturn = getRandomInt(30, 85) + getAgeMult(age);
  stats.ballCarrierRatings.Carrying = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.Trucking = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.BCVision = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.StiffArm = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.SpinMove = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.JukeMove = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.BreakTackle = getRandomInt(30, 70) + getAgeMult(age);
  stats.ballCarrierRatings.ChangeOfDirection =
    getRandomInt(30, 70) + getAgeMult(age);
  return stats;
};
