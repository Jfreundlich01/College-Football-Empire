import { useEffect, useState } from "react";
import { generatePlayer } from "../utils/Players/generatePlayer";

export default function App() {
  // Define the state for the players
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [render, setRender] = useState(true);
  // Use the useEffect hook to generate the players when the component mounts

  // const handleClick = () => {
  //   setPlayers((prevPlayers) => {
  //     let updatedPlayers = [...prevPlayers];
  //     for (let i = 0; i < 500; i++) {
  //       const newPlayer = generatePlayer("TE", "Boston, Ma");
  //       updatedPlayers.push(newPlayer);
  //     }
  //     // updatedPlayers.sort((a, b) => b.overall - a.overall); // sort by overall
  //     return updatedPlayers;
  //   });
  // };

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
    for (let i = 0; i < 3; i++) {
      const newPlayer = generatePlayer("DL", "Boston, Ma");
      newPlayers.push(newPlayer);
    }

    setPlayers(newPlayers);
  };

  console.log(players);
  return (
    <div className="App">
      <h1>Hello Graham</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleClick}>Click me to do something</button>
      <ul>
        {/* {players.map((player, index) => (
          <li key={index}>
            {player.firstName} {player.lastName} - Age: {player.age}
            {player.year}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
