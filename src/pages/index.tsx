import "./styles.css";
import { useEffect, useState } from "react";
import { generatelPlayer } from "./Players/generatePlayer";

export default function App() {
  // Define the state for the players
  const [players, setPlayers] = useState([]);
  const [render, setRender] = useState(true);
  // Use the useEffect hook to generate the players when the component mounts
  useEffect(() => {
    for (let i = 0; i < 200; i++) {
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        generatelPlayer("RB", "Boston, MA"),
      ]);
    }
    // generateTeam();
  }, [render]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={() => {
          console.log(players);
          // generateTeam();
        }}
      >
        Click me to do something
      </button>
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
