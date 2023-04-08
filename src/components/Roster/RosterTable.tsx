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

interface Props {
  players: Player[];
}

export const RosterTable = ({ players }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <>d</>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
