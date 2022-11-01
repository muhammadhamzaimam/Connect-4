import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Components/HomeScreen";
import { GameScreen } from "./Components/GameScreen";
import { InstructionScreen } from "./Components/InstructionScreen";

function App() {

    const[playerNames, setPlayerNames] = useState({Player1Name: "", Player2Name: ""});

    return (
      <BrowserRouter>
          <Routes>
              <Route index element={<HomeScreen setPlayerNames={setPlayerNames} playerNames={playerNames}/>}/>
              <Route path="/game" element={<GameScreen playerNames={playerNames}/>}/>
              <Route path="/instructions" element={<InstructionScreen/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
