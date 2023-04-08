export const getOverall = (uniqueStats, position) => {
  let stats = uniqueStats;

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
    (stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower +
      stats.passerRatings.ThrowPower) /
    7;

  const defenseRatingsOverall =
    (stats.defenseRatings.Tackle +
      stats.defenseRatings.PowerMoves +
      stats.defenseRatings.FinesseMoves +
      stats.defenseRatings.BlockShedding +
      stats.defenseRatings.Pursuit +
      stats.defenseRatings.PlayRecognition +
      stats.defenseRatings.ManCoverage +
      stats.defenseRatings.ZoneCoverage +
      stats.defenseRatings.HitPower +
      stats.defenseRatings.Press) /
    10;

  const receivingRatingsOverall =
    (stats.receivingRatings.Catching +
      stats.receivingRatings.SpectacularCatch +
      stats.receivingRatings.CatchinTraffic +
      stats.receivingRatings.ShortRouteRunning +
      stats.receivingRatings.MediumRouteRunning +
      stats.receivingRatings.DeepRouteRunning +
      stats.receivingRatings.Release) /
    8;

  let kickingRatingsOverall =
    (stats.kickingRatings.KickPower + stats.kickingRatings.KickAccuracy) / 2;

  let kickReturnOverall = stats.kickingRatings.KickReturn;
  if (position === "K" || position === "P") {
    let overall = kickingRatingsOverall;
    return overall;
  }
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
    generalRatingsWeight = 0.25;
    ballCarrierRatingsWeight = 0.5;
    passerRatingsWeight = 0.05;
    blockingRatingsWeight = 0.1;
    defenseRatingsWeight = 0.05;
    receivingRatingsWeight = 0.1;
    kickingRatingsWeight = 0.05;
    kickReturnWeight = 0.05;
  } else if (position === "WR") {
    generalRatingsWeight = 0.25;
    ballCarrierRatingsWeight = 0.05;
    passerRatingsWeight = 0.05;
    blockingRatingsWeight = 0.05;
    defenseRatingsWeight = 0.05;
    receivingRatingsWeight = 0.6;
    kickingRatingsWeight = 0.05;
    kickReturnWeight = 0.05;
  } else if (position === "TE") {
    generalRatingsWeight = 0.35;
    ballCarrierRatingsWeight = 0.1;
    passerRatingsWeight = 0.05;
    blockingRatingsWeight = 0.2;
    defenseRatingsWeight = 0.05;
    receivingRatingsWeight = 0.3;
    kickingRatingsWeight = 0.05;
    kickReturnWeight = 0.05;
  } else if (
    position === "LT" ||
    position === "LG" ||
    position === "LG" ||
    position === "C" ||
    position === "RG" ||
    position === "RT"
  ) {
    generalRatingsWeight = 0.25;
    ballCarrierRatingsWeight = 0.01;
    passerRatingsWeight = 0.01;
    blockingRatingsWeight = 0.7;
    defenseRatingsWeight = 0.01;
    receivingRatingsWeight = 0.01;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.005;
  } else if (position === "CB" || position === "FS" || position === "SS") {
    generalRatingsWeight = 0.25;
    ballCarrierRatingsWeight = 0.01;
    passerRatingsWeight = 0.01;
    blockingRatingsWeight = 0.01;
    defenseRatingsWeight = 0.6;
    receivingRatingsWeight = 0.01;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.1;
  } else if (position === "ROLB" || position === "LOLB") {
    generalRatingsWeight = 0.35;
    ballCarrierRatingsWeight = 0.01;
    passerRatingsWeight = 0.01;
    blockingRatingsWeight = 0.01;
    defenseRatingsWeight = 0.6;
    receivingRatingsWeight = 0.005;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.005;
  } else if (position === "MLB") {
    generalRatingsWeight = 0.3;
    ballCarrierRatingsWeight = 0.01;
    passerRatingsWeight = 0.01;
    blockingRatingsWeight = 0.01;
    defenseRatingsWeight = 0.6;
    receivingRatingsWeight = 0.01;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.005;
  } else if (position === "DL") {
    generalRatingsWeight = 0.35;
    ballCarrierRatingsWeight = 0.005;
    passerRatingsWeight = 0.005;
    blockingRatingsWeight = 0.005;
    defenseRatingsWeight = 0.65;
    receivingRatingsWeight = 0.005;
    kickingRatingsWeight = 0.005;
    kickReturnWeight = 0.005;
  }

  let overall =
    generalRatingsWeight * generalRatingsOverall +
    ballCarrierRatingsWeight * ballCarrierRatingsOverall +
    passerRatingsWeight * passerRatingsOverall +
    blockingRatingsWeight * blockingRatingsOverall +
    defenseRatingsWeight * defenseRatingsOverall +
    receivingRatingsWeight * receivingRatingsOverall +
    kickingRatingsWeight * kickingRatingsOverall +
    kickReturnWeight * kickReturnOverall;

  return overall;
};
