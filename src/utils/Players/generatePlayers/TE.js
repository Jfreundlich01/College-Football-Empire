import { getRandomInt } from "../../getRandomInt";
import { getAgeMult } from "../getAgeMult";

export const generateTE = (age, baseStats) => {
  const stats = { ...baseStats };

  //GeneralRatings
  stats.generalRatings.Speed = getRandomInt(70, 90) + getAgeMult(age);
  stats.generalRatings.Acceleration = getRandomInt(50, 85) + getAgeMult(age);
  stats.generalRatings.Agility = getRandomInt(50, 85) + getAgeMult(age);
  stats.generalRatings.Jumping = getRandomInt(50, 85) + getAgeMult(age);

  // RecievingRatings
  stats.receivingRatings.Catching = getRandomInt(55, 85) + getAgeMult(age);
  stats.receivingRatings.SpectacularCatch =
    getRandomInt(55, 80) + getAgeMult(age);
  stats.receivingRatings.Release = getRandomInt(55, 85) + getAgeMult(age);
  stats.receivingRatings.CatchinTraffic =
    getRandomInt(55, 85) + getAgeMult(age);
  stats.receivingRatings.RunAfterCatch = getRandomInt(55, 85) + getAgeMult(age);
  stats.receivingRatings.ShortRouteRunning =
    getRandomInt(60, 85) + getAgeMult(age);
  stats.receivingRatings.MediumRouteRunning =
    getRandomInt(50, 85) + getAgeMult(age);
  stats.receivingRatings.DeepRouteRunning =
    getRandomInt(40, 85) + getAgeMult(age);

  // BallCarrier Ratings
  stats.ballCarrierRatings.Carrying = getRandomInt(20, 70) + getAgeMult(age);
  stats.ballCarrierRatings.Trucking = getRandomInt(20, 70) + getAgeMult(age);
  stats.ballCarrierRatings.BCVision = getRandomInt(20, 60) + getAgeMult(age);
  stats.ballCarrierRatings.StiffArm = getRandomInt(20, 70) + getAgeMult(age);
  stats.ballCarrierRatings.SpinMove = getRandomInt(20, 70) + getAgeMult(age);
  stats.ballCarrierRatings.JukeMove = getRandomInt(20, 70) + getAgeMult(age);
  stats.ballCarrierRatings.BreakTackle = getRandomInt(20, 75) + getAgeMult(age);
  stats.ballCarrierRatings.ChangeOfDirection =
    getRandomInt(20, 70) + getAgeMult(age);

  // BlockingRatings
  stats.blockingRatings.PassBlock = getRandomInt(50, 80) + getAgeMult(age);
  stats.blockingRatings.RunBlock = getRandomInt(50, 80) + getAgeMult(age);
  stats.blockingRatings.ImpactBlocking = getRandomInt(50, 80) + getAgeMult(age);
  stats.blockingRatings.RunBlockPower = getRandomInt(55, 80) + getAgeMult(age);
  stats.blockingRatings.RunBlockFinesse =
    getRandomInt(55, 85) + getAgeMult(age);
  stats.blockingRatings.PassBlockPower = getRandomInt(50, 80) + getAgeMult(age);
  stats.blockingRatings.PassBlockFinesse =
    getRandomInt(50, 80) + getAgeMult(age);
  stats.blockingRatings.LeadBlock = getRandomInt(50, 80) + getAgeMult(age);

  return stats;
};
