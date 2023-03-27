import { getRandomInt } from "../../getRandomInt";

export const baseStats = {
  generalRatings: {
    Speed: getRandomInt(40, 85),
    Acceleration: getRandomInt(40, 85),
    Strength: getRandomInt(40, 85),
    Agility: getRandomInt(40, 85),
    Awareness: getRandomInt(40, 85),
    Jumping: getRandomInt(40, 85),
    Injury: getRandomInt(40, 85),
    Stamina: getRandomInt(40, 85),
    Toughness: getRandomInt(40, 85),
  },
  ballCarrierRatings: {
    Carrying: getRandomInt(10, 50),
    Trucking: getRandomInt(10, 50),
    BCVision: getRandomInt(10, 50),
    StiffArm: getRandomInt(10, 50),
    SpinMove: getRandomInt(10, 50),
    JukeMove: getRandomInt(10, 50),
    BreakTackle: getRandomInt(10, 50),
    BreakSack: getRandomInt(10, 50),
    ChangeOfDirection: getRandomInt(10, 50),
  },
  blockingRatings: {
    RunBlock: getRandomInt(10, 50),
    PassBlock: getRandomInt(10, 50),
    ImpactBlocking: getRandomInt(10, 50),
    RunBlockPower: getRandomInt(10, 50),
    RunBlockFinesse: getRandomInt(10, 50),
    PassBlockPower: getRandomInt(10, 50),
    PassBlockFinesse: getRandomInt(10, 50),
    LeadBlock: getRandomInt(10, 50),
  },
  PasserRatings: {
    ThrowPower: getRandomInt(10, 50),
    ThrowAccuracyShort: getRandomInt(10, 50),
    ThrowAccuracyMedium: getRandomInt(10, 50),
    ThrowAccuracyDeep: getRandomInt(10, 50),
    ThrowontheRun: getRandomInt(10, 50),
    PlayAction: getRandomInt(10, 50),
    ThrowUnderPressure: getRandomInt(10, 50),
  },
  DefenseRatings: {
    Tackle: getRandomInt(10, 50),
    PowerMoves: getRandomInt(10, 50),
    FinesseMoves: getRandomInt(10, 50),
    BlockShedding: getRandomInt(10, 50),
    Pursuit: getRandomInt(10, 50),
    PlayRecognition: getRandomInt(10, 50),
    ManCoverage: getRandomInt(10, 50),
    ZoneCoverage: getRandomInt(10, 50),
    HitPower: getRandomInt(10, 50),
    Press: getRandomInt(10, 50),
  },
  ReceivingRatings: {
    Catching: getRandomInt(10, 50),
    SpectacularCatch: getRandomInt(10, 50),
    CatchinTraffic: getRandomInt(10, 50),
    ShortRouteRunning: getRandomInt(10, 50),
    MediumRouteRunning: getRandomInt(10, 50),
    DeepRouteRunning: getRandomInt(10, 50),
    Release: getRandomInt(10, 50),
  },
  KickingRatings: {
    kickPower: getRandomInt(10, 50),
    kickAccuracy: getRandomInt(10, 50),
    kickReturn: getRandomInt(10, 50),
  },
};
