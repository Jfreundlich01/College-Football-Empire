import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateRB = (age, baseStats) => {
  const stats = { baseStats };

  // GeneralRatings
  stats.generalRatings.Speed = getRandomInt(70, 100) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Agility = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Jumping = getRandomInt(70, 90) + getAgeMult(age);

  // BallCarrierRatings
  stats.ballCarrierRatings.Carrying = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.Trucking = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.BCVision = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.StiffArm = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.SpinMove = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.JukeMove = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.BreakTackle = getRandomInt(65, 85) + getAgeMult(age);
  stats.ballCarrierRatings.ChangeOfDirection =
    getRandomInt(65, 80) + getAgeMult(age);

  // CatchingRatings
  stats.receivingRatings.Catching = getRandomInt(30, 75) + getAgeMult(age);
  stats.receivingRatings.SpectacularCatch =
    getRandomInt(10, 75) + getAgeMult(age);
  stats.receivingRatings.Release = getRandomInt(30, 75) + getAgeMult(age);
  stats.receivingRatings.CatchinTraffic =
    getRandomInt(10, 75) + getAgeMult(age);
  stats.receivingRatings.RunAfterCatch =
    getRandomInt(
      stats.ballCarrierRatings.BCVision - 10,
      stats.ballCarrierRatings.BCVision
    ) + getAgeMult(age);
  stats.receivingRatings.ShortRouteRunning =
    getRandomInt(30, 85) + getAgeMult(age);
  stats.receivingRatings.MediumRouteRunning =
    getRandomInt(10, 75) + getAgeMult(age);
  stats.receivingRatings.DeepRouteRunning =
    getRandomInt(10, 70) + getAgeMult(age);

  // BlockingRatings
  stats.blockingRatings.PassBlock = getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.RunBlock = getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.ImpactBlocking = getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.RunBlockPower = getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.RunBlockFinesse =
    getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.PassBlockPower = getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.PassBlockFinesse =
    getRandomInt(10, 70) + getAgeMult(age);
  stats.blockingRatings.LeadBlock = getRandomInt(10, 70) + getAgeMult(age);

  // KickingRatings
  stats.kickingRatings.KickReturn = getRandomInt(30, 85) + getAgeMult(age);

  return stats;
};
