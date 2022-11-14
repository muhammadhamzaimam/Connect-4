import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import GameScreen from "./Components/GameScreen";
import InstructionScreen from "./Components/InstructionScreen";
import {numOfColumns, numOfRows} from "./Constants";
import {gameResult} from "./Components/GameScreenComponents/WinningLogic";

export interface PlayerNames{
    Player1Name: string
    Player2Name: string
}

export interface PlayerColors{
    Player1Color: string
    Player2Color: string
}

export interface PlayerScores{
    Player1Score: number
    Player2Score: number
}

function App() {

    const[playerNames, setPlayerNames] = useState({Player1Name: "", Player2Name: ""});
    const[playerColors, setPlayerColors] = useState({Player1Color: "#FF0000", Player2Color: "#FFFF00"});
    const[playerScores, setPlayerScores] = useState({Player1Score: 0, Player2Score:0})
    const[gameStatus, setGameStatus] = useState({result: gameResult.ongoing, playerNumber: 1, gameBoard:Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0)), winner: 0});

    return (
      <BrowserRouter>
          <Routes>
              <Route index element={<HomeScreen setPlayerNames={setPlayerNames}
                                                playerNames={playerNames}
                                                playerColors={playerColors}
                                                setPlayerColors={setPlayerColors}
                                                setGameStatus={setGameStatus}
                                                setPlayerScores={setPlayerScores}/>}/>
              <Route path="/game" element={<GameScreen playerNames={playerNames}
                                                       gameStatus={gameStatus}
                                                       setGameStatus={setGameStatus}
                                                       playerColors={playerColors}
                                                       setPlayerColors={setPlayerColors}
                                                       playerScores={playerScores}
                                                       setPlayerScores={setPlayerScores}/>}/>
              <Route path="/instructions" element={<InstructionScreen/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;