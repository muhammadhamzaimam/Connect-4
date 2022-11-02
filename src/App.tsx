import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import GameScreen from "./Components/GameScreen";
import InstructionScreen from "./Components/InstructionScreen";
import {numOfColumns, numOfRows} from "./Constants";

function App() {

    const[playerNames, setPlayerNames] = useState({Player1Name: "", Player2Name: ""});
    const[playerMoveCount, setPlayerMoveCount] = useState(0)

    /*set up a 2D array for the game board
    * pass the array to board.tsx
    * board will pass the corresponding 1D array into column.tsx
    * column.tsx will use the values in the 1D array to populate the column element values*/
    const [gameBoard, setGameBoard] = useState(
        Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0)));

    /*
    * [
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0],
    * [0,0,0,0,0,0]
    * ]
    *
    * */

    return (
      <BrowserRouter>
          <Routes>
              <Route index element={<HomeScreen setPlayerNames={setPlayerNames} playerNames={playerNames}/>}/>
              <Route path="/game" element={<GameScreen playerNames={playerNames} playerMoveCount={playerMoveCount} setPlayerMoveCount={setPlayerMoveCount}
                                                       gameBoard={gameBoard} setGameBoard={setGameBoard}/>}/>
              <Route path="/instructions" element={<InstructionScreen/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;