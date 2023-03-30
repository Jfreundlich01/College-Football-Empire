import { useEffect, useState } from "react";
import { generatePlayer } from "../utils/Players/generatePlayer";

export default function App() {
  // Define the state for the players
  const [players, setPlayers] = useState([]);
  const [render, setRender] = useState(true);
  // Use the useEffect hook to generate the players when the component mounts

  const handleClick = () => {
    setPlayers((prevPlayers) => {
      let updatedPlayers = [...prevPlayers];
      for (let i = 0; i < 500; i++) {
        const newPlayer = generatePlayer("TE", "Boston, Ma");
        updatedPlayers.push(newPlayer);
      }
      // updatedPlayers.sort((a, b) => b.overall - a.overall); // sort by overall
      return updatedPlayers;
    });
  };

  const sorted = players.sort((a, b) => b.overall - a.overall);

  console.log(sorted);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
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
