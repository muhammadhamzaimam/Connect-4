import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Components/HomeScreen";
import { GameScreen } from "./Components/GameScreen";
import { InstructionScreen } from "./Components/InstructionScreen";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/Game" element={<GameScreen/>}/>
                <Route path="/Instructions" element={<InstructionScreen/>}/>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
