export function getOverall(baseStats, position) {
  let stats = baseStats;
  const generalRatingsOverall =
    (stats.generalRatings.Speed +
      stats.generalRatings.Acceleration +
      stats.generalRatings.Strength +
      stats.generalRatings.Agility +
      stats.generalRatings.Awareness +
      stats.generalRatings.Jumping +
      stats.generalRatings.Injury +
      stats.generalRatings.Stamina +
      stats.generalRatings.Toughness) /
    9;
  const ballCarrierRatingsOverall =
    (stats.ballCarrierRatings.Carrying +
      stats.ballCarrierRatings.Trucking +
      stats.ballCarrierRatings.BCVision +
      stats.ballCarrierRatings.StiffArm +
      stats.ballCarrierRatings.SpinMove +
      stats.ballCarrierRatings.JukeMove +
      stats.ballCarrierRatings.BreakTackle +
      stats.ballCarrierRatings.BreakSack +
      stats.ballCarrierRatings.ChangeOfDirection) /
    9;
  const blockingRatingsOverall =
    (stats.blockingRatings.RunBlock +
      stats.blockingRatings.PassBlock +
      stats.blockingRatings.ImpactBlocking +
      stats.blockingRatings.RunBlockPower +
      stats.blockingRatings.RunBlockFinesse +
      stats.blockingRatings.PassBlockPower +
      stats.blockingRatings.PassBlockFinesse +
      stats.blockingRatings.LeadBlock) /
    8;
  const passerRatingsOverall =
    (stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower +
      stats.PasserRatings.ThrowPower) /
    7;
  const DefenseRatingsOverall =
    (stats.DefenseRatings.Tackle +
      stats.DefenseRatings.PowerMoves +
      stats.DefenseRatings.FinesseMoves +
      stats.DefenseRatings.BlockShedding +
      stats.DefenseRatings.Pursuit +
      stats.DefenseRatings.PlayRecognition +
      stats.DefenseRatings.ManCoverage +
      stats.DefenseRatings.ZoneCoverage +
      stats.DefenseRatings.HitPower +
      stats.DefenseRatings.Press) /
    10;
  const ReceivingRatingsOverall =
    (stats.ReceivingRatings.Catching +
      stats.ReceivingRatings.SpectacularCatch +
      stats.ReceivingRatings.CatchinTraffic +
      stats.ReceivingRatings.ShortRouteRunning +
      stats.ReceivingRatings.MediumRouteRunning +
      stats.ReceivingRatings.DeepRouteRunning +
      stats.ReceivingRatings.Release) /
    7;
  const KickingRatingsOverall =
    (stats.KickingRatings.kickPower + stats.KickingRatings.kickAccuracy) / 2;
  const kickReturnOverall = stats.KickingRatings.kickReturn;
  let generalRatingsWeight;
  let ballCarrierRatingsWeight;
  let passerRatingsWeight;
  let blockingRatingsWeight;
  let defenseRatingsWeight;
  let receivingRatingsWeight;
  let kickingRatingsWeight;
  let kickReturnWeight;
  if (position === "QB") {
    generalRatingsWeight = 0.2;
    ballCarrierRatingsWeight = 0.2;
    passerRatingsWeight = 0.6;
    blockingRatingsWeight = 0.0025;
    defenseRatingsWeight = 0.0025;
    receivingRatingsWeight = 0.0025;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.005;
  } else if (position === "RB") {
    generalRatingsWeight = 0.35;
    ballCarrierRatingsWeight = 0.6;
    passerRatingsWeight = 0.025;
    blockingRatingsWeight = 0.025;
    defenseRatingsWeight = 0.025;
    receivingRatingsWeight = 0.025;
    kickingRatingsWeight = 0.025;
    kickReturnWeight = 0.075;
  }
  let overall =
    generalRatingsWeight * generalRatingsOverall +
    ballCarrierRatingsWeight * ballCarrierRatingsOverall +
    passerRatingsWeight * passerRatingsOverall +
    blockingRatingsWeight * blockingRatingsOverall +
    defenseRatingsWeight * DefenseRatingsOverall +
    receivingRatingsWeight * ReceivingRatingsOverall +
    kickingRatingsWeight * KickingRatingsOverall +
    kickReturnWeight * kickReturnOverall;
  return overall;
}
