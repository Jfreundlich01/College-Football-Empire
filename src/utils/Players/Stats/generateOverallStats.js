import { generateQB } from "../generatePlayers/QB";
import { generateRB } from "../generatePlayers/RB";
import { generateWR } from "../generatePlayers/WR";
import { generateTE } from "../generatePlayers/TE";
import { generateOL } from "../generatePlayers/OL";
import { generateDB } from "../generatePlayers/DB";
import { generateOLB } from "../generatePlayers/OLB";
import { generateMLB } from "../generatePlayers/MLB";
import { generateDL } from "../generatePlayers/DL";
import { getOverall } from "@/utils/getOverall";

export function generateOverallStats(position, age, uniqueStats) {
  let stats, overall;
  if (position === "QB") {
    stats = generateQB(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "RB") {
    stats = generateRB(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "WR") {
    stats = generateWR(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "TE") {
    stats = generateTE(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (
    position === "LT" ||
    position === "LG" ||
    position === "LG" ||
    position === "C" ||
    position === "RG" ||
    position === "RT"
  ) {
    stats = generateOL(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "CB" || position === "FS" || position === "SS") {
    stats = generateDB(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "ROLB" || position === "LOLB") {
    stats = generateOLB(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "MLB") {
    stats = generateMLB(age, uniqueStats);
    overall = getOverall(stats, position);
  } else if (position === "DL") {
    stats = generateDL(age, uniqueStats);
    overall = getOverall(stats, position);
  }
  return { stats, overall };
}
