import { Player } from "../Interfaces/Players";
import { TableRow, TableCell } from "@mui/material";
import { TableCellProps } from "@mui/material/TableCell";

interface Props {
  player: Player;
}

export const RosterRow = ({ player }: Props) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          position: "sticky",
          left: "0",
          background: "white",
        }}
      >
        {player.position}
      </TableCell>
      <TableCell
        sx={{
          position: "sticky",
          left: "78px",
          background: "white",
        }}
      >{`${player.firstName} ${player.lastName}`}</TableCell>
      <TableCell>{player.overall}</TableCell>
      <TableCell>{player.age}</TableCell>
      <TableCell>{player.year}</TableCell>
      <TableCell>{player.location}</TableCell>
      <TableCell>{player.school}</TableCell>
      <TableCell>{player.stats.generalRatings.Speed}</TableCell>
      <TableCell>{player.stats.generalRatings.Acceleration}</TableCell>
      <TableCell>{player.stats.generalRatings.Strength}</TableCell>
      <TableCell>{player.stats.generalRatings.Agility}</TableCell>
      <TableCell>{player.stats.generalRatings.Awareness}</TableCell>
      <TableCell>{player.stats.generalRatings.Jumping}</TableCell>
      <TableCell>{player.stats.generalRatings.Injury}</TableCell>
      <TableCell>{player.stats.generalRatings.Stamina}</TableCell>
      <TableCell>{player.stats.generalRatings.Toughness}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.Carrying}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.Trucking}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.BCVision}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.StiffArm}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.SpinMove}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.JukeMove}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.BreakTackle}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.BreakSack}</TableCell>
      <TableCell>{player.stats.ballCarrierRatings.ChangeOfDirection}</TableCell>
      <TableCell>{player.stats.blockingRatings.RunBlock}</TableCell>
      <TableCell>{player.stats.blockingRatings.PassBlock}</TableCell>
      <TableCell>{player.stats.blockingRatings.ImpactBlocking}</TableCell>
      <TableCell>{player.stats.blockingRatings.RunBlockPower}</TableCell>
      <TableCell>{player.stats.blockingRatings.RunBlockFinesse}</TableCell>
      <TableCell>{player.stats.blockingRatings.PassBlockPower}</TableCell>
      <TableCell>{player.stats.blockingRatings.PassBlockFinesse}</TableCell>
      <TableCell>{player.stats.blockingRatings.LeadBlock}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowPower}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowAccuracyShort}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowAccuracyMedium}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowAccuracyDeep}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowontheRun}</TableCell>
      <TableCell>{player.stats.passerRatings.PlayAction}</TableCell>
      <TableCell>{player.stats.passerRatings.ThrowUnderPressure}</TableCell>
      <TableCell>{player.stats.defenseRatings.Tackle}</TableCell>
      <TableCell>{player.stats.defenseRatings.PowerMoves}</TableCell>
      <TableCell>{player.stats.defenseRatings.FinesseMoves}</TableCell>
      <TableCell>{player.stats.defenseRatings.BlockShedding}</TableCell>
      <TableCell>{player.stats.defenseRatings.Pursuit}</TableCell>
      <TableCell>{player.stats.defenseRatings.PlayRecognition}</TableCell>
      <TableCell>{player.stats.defenseRatings.ManCoverage}</TableCell>
      <TableCell>{player.stats.defenseRatings.ZoneCoverage}</TableCell>
      <TableCell>{player.stats.defenseRatings.HitPower}</TableCell>
      <TableCell>{player.stats.defenseRatings.Press}</TableCell>
      <TableCell>{player.stats.receivingRatings.Catching}</TableCell>
      <TableCell>{player.stats.receivingRatings.SpectacularCatch}</TableCell>
      <TableCell>{player.stats.receivingRatings.CatchinTraffic}</TableCell>
      <TableCell>{player.stats.receivingRatings.ShortRouteRunning}</TableCell>
      <TableCell>{player.stats.receivingRatings.MediumRouteRunning}</TableCell>
      <TableCell>{player.stats.receivingRatings.DeepRouteRunning}</TableCell>
      <TableCell>{player.stats.receivingRatings.Release}</TableCell>
      <TableCell>{player.stats.receivingRatings.RunAfterCatch}</TableCell>
      <TableCell>{player.stats.kickingRatings.KickPower}</TableCell>
      <TableCell>{player.stats.kickingRatings.KickAccuracy}</TableCell>
      <TableCell>{player.stats.kickingRatings.KickReturn}</TableCell>
    </TableRow>
  );
};
