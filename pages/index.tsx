import type { NextPage } from "next";
import Head from "next/head";
import { getSession, GetSessionParams } from "next-auth/react";
import { useEffect, useState } from "react";
import { generatePlayer } from "../src/utils/Players/generatePlayer";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { RosterTable } from "@/components/Roster/RosterTable";

// NOTE: THis page can be used as a marketing landing page that can have
// a login button that can redirect the user to /auth/login.
// For now, it's not in use, instead we redirect the user to the dashboard
// or auth/login depending on the session
export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "auth/login",
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "authorized/dashboard",
    },
  };
};

const Home: NextPage = () => {
  // console.log('Debug');

  // Define the state for the players
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [render, setRender] = useState(true);

  const handleClick = () => {
    let newPlayers = [];

    // generate 4 QBs
    for (let i = 0; i < 4; i++) {
      const newPlayer = generatePlayer("QB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    // generate 7 WRs
    for (let i = 0; i < 7; i++) {
      const newPlayer = generatePlayer("WR", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    // generate 5 RBs
    for (let i = 0; i < 5; i++) {
      const newPlayer = generatePlayer("RB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    // generate 3 TEs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("TE", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    // generate 3 LTs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("LT", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 LGs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("LG", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 Cs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("C", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 RGs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("RG", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 RTs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("RT", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 5 CBs
    for (let i = 0; i < 5; i++) {
      const newPlayer = generatePlayer("CB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 FSs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("FS", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 SSs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("SS", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 ROLBs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("ROLB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 LOLBs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("LOLB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 3 MLBs
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("MLB", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generare 3 DL
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("DL", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 2 k
    for (let i = 0; i < 2; i++) {
      const newPlayer = generatePlayer("K", "Boston, Ma");
      newPlayers.push(newPlayer);
    }
    // generate 2 P
    for (let i = 0; i < 2; i++) {
      const newPlayer = generatePlayer("P", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    setPlayers(newPlayers);
  };
  return (
    <Box className="App">
      <Typography>Roster</Typography>
      <Typography>Make a team</Typography>
      <Button onClick={handleClick}>Click To generate a team</Button>
      {players && <RosterTable players={players} />}
    </Box>
  );
};

export default Home;
