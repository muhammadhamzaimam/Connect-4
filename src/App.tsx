import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Components/HomeScreen";
import { GameScreen } from "./Components/GameScreen";
import { InstructionScreen } from "./Components/InstructionScreen";

function App() {

    function handlePlayButton(player1Name:string, player2Name:string){
        console.log(player1Name, player2Name);
    }

    return (
      <BrowserRouter>
          <Routes>
              <Route index element={<HomeScreen onPlayButtonClick={handlePlayButton}/>}/>
              <Route path="/game" element={<GameScreen/>}/>
              <Route path="/instructions" element={<InstructionScreen/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
