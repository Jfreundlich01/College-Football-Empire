export interface Player {
  position: string;
  firstName: string;
  lastName: string;
  overall: number;
  age: number;
  year: string;
  location: string;
  school: string;
  stats: Stats;
}

export interface Stats {
  generalRatings: {
    Speed: number;
    Acceleration: number;
    Strength: number;
    Agility: number;
    Awareness: number;
    Jumping: number;
    Injury: number;
    Stamina: number;
    Toughness: number;
  };
  ballCarrierRatings: {
    Carrying: number;
    Trucking: number;
    BCVision: number;
    StiffArm: number;
    SpinMove: number;
    JukeMove: number;
    BreakTackle: number;
    BreakSack: number;
    ChangeOfDirection: number;
  };
  blockingRatings: {
    RunBlock: number;
    PassBlock: number;
    ImpactBlocking: number;
    RunBlockPower: number;
    RunBlockFinesse: number;
    PassBlockPower: number;
    PassBlockFinesse: number;
    LeadBlock: number;
  };
  passerRatings: {
    ThrowPower: number;
    ThrowAccuracyShort: number;
    ThrowAccuracyMedium: number;
    ThrowAccuracyDeep: number;
    ThrowontheRun: number;
    PlayAction: number;
    ThrowUnderPressure: number;
  };
  defenseRatings: {
    Tackle: number;
    PowerMoves: number;
    FinesseMoves: number;
    BlockShedding: number;
    Pursuit: number;
    PlayRecognition: number;
    ManCoverage: number;
    ZoneCoverage: number;
    HitPower: number;
    Press: number;
  };
  receivingRatings: {
    Catching: number;
    SpectacularCatch: number;
    CatchinTraffic: number;
    ShortRouteRunning: number;
    MediumRouteRunning: number;
    DeepRouteRunning: number;
    Release: number;
    RunAfterCatch: number;
  };
  kickingRatings: {
    KickPower: number;
    KickAccuracy: number;
    KickReturn: number;
  };
}
