import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Components/HomeScreen";
import { GameScreen } from "./Components/GameScreen";
import { InstructionScreen } from "./Components/InstructionScreen";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/game" element={<GameScreen/>}/>
                <Route path="/instructions" element={<InstructionScreen/>}/>
            </Routes>
    </BrowserRouter>
  );
}

export default App;
