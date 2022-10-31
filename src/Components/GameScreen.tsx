import React from "react"
import { Board } from "./GameScreenComponents/Board"
import { GameHeader } from "./GameScreenComponents/GameHeader";
import { GameFooter } from "./GameScreenComponents/GameFooter";

function GameScreen(){
    return (
        <div>
            <GameHeader playerName="Player 1"/>
            <Board/>
            <GameFooter player1Name="Bot 1" player2Name="Bot 2"/>
        </div>
    )
}

export { GameScreen }