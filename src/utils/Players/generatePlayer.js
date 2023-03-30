import { firstNames } from "../firstnames";
import { getHighSchoolYear } from "../getHighSchoolYear";
import { getRandomInt } from "../getRandomInt";
import { lastNames } from "../lastNames";
import { getOverall } from "../getOverall";
import { getRandomCityByState } from "../citiesAndStates";
import { Player } from "../../classes/player";
import { generateOverallStats } from "./Stats/generateOverallStats";
import { baseStats } from "./Stats/baseStats";
export const generatePlayer = (pos, loc) => {
  const uniqueStats = baseStats();

  const firstNameIndex = getRandomInt(0, firstNames.length - 1);
  const lastNameIndex = getRandomInt(0, lastNames.length - 1);
  const age = getRandomInt(15, 18);
  const year = getHighSchoolYear(age);
  const position = pos;
  const { stats, overall } = generateOverallStats(position, age, uniqueStats);
  const location = loc;
  const player = new Player(
    firstNames[firstNameIndex],
    lastNames[lastNameIndex],
    age,
    year,
    position,
    stats,
    overall,
    location
  );
  return player;
};
