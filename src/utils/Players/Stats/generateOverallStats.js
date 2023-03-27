import { generateQB } from "../generatePlayers/QB";
import { baseStats } from "./BaseStats";
import { generateRB } from "../generatePlayers/RB";

export function generateOverallStats(position, age) {
  let stats = baseStats;

  if (position === "QB") {
    return generateQB(age, stats);
  } else if (position === "RB") {
    return generateRB(age, stats);
  }
}
