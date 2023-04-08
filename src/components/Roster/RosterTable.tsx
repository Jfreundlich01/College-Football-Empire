import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Player } from "../Interfaces/Players";
import { RosterRow } from "./RosterRow";

interface Props {
  players: Player[];
}

export const RosterTable = ({ players }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: "sticky",
                left: "0",
                background: "white",
              }}
            >
              Postion
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                left: "78px",
                background: "white",
              }}
            >
              Name
            </TableCell>
            <TableCell>Overall</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>School</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Acceleration</TableCell>
            <TableCell>Strength</TableCell>
            <TableCell>Agility</TableCell>
            <TableCell>Awareness</TableCell>
            <TableCell>Jumping</TableCell>
            <TableCell>Injury</TableCell>
            <TableCell>Stamina</TableCell>
            <TableCell>Toughness</TableCell>
            <TableCell>Carrying</TableCell>
            <TableCell>Trucking</TableCell>
            <TableCell>BCVision</TableCell>
            <TableCell>StiffArm</TableCell>
            <TableCell>SpinMove</TableCell>
            <TableCell>JukeMove</TableCell>
            <TableCell>BreakTackle</TableCell>
            <TableCell>BreakSack</TableCell>
            <TableCell>ChangeOfDirection</TableCell>
            <TableCell>RunBlock</TableCell>
            <TableCell>PassBlock</TableCell>
            <TableCell>ImpactBlocking</TableCell>
            <TableCell>RunBlockPower</TableCell>
            <TableCell>RunBlockFinesse</TableCell>
            <TableCell>PassBlockPower</TableCell>
            <TableCell>PassBlockFinesse</TableCell>
            <TableCell>LeadBlock</TableCell>
            <TableCell>ThrowPower</TableCell>
            <TableCell>ThrowAccuracyShort</TableCell>
            <TableCell>ThrowAccuracyMedium</TableCell>
            <TableCell>ThrowAccuracyDeep</TableCell>
            <TableCell>ThrowontheRun</TableCell>
            <TableCell>PlayAction</TableCell>
            <TableCell>ThrowUnderPressure</TableCell>
            <TableCell>Tackle</TableCell>
            <TableCell>PowerMoves</TableCell>
            <TableCell>FinesseMoves</TableCell>
            <TableCell>BlockShedding</TableCell>
            <TableCell>Pursuit</TableCell>
            <TableCell>PlayRecognition</TableCell>
            <TableCell>ManCoverage</TableCell>
            <TableCell>ZoneCoverage</TableCell>
            <TableCell>HitPower</TableCell>
            <TableCell>Press</TableCell>
            <TableCell>Catching</TableCell>
            <TableCell>SpectacularCatch</TableCell>
            <TableCell>CatchinTraffic</TableCell>
            <TableCell>ShortRouteRunning</TableCell>
            <TableCell>MediumRouteRunning</TableCell>
            <TableCell>DeepRouteRunning</TableCell>
            <TableCell>Release</TableCell>
            <TableCell>RunAfterCatch</TableCell>
            <TableCell>KickPower</TableCell>
            <TableCell>KickAccuracy</TableCell>
            <TableCell>KickReturn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <RosterRow key={index} player={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
