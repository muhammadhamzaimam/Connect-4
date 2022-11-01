import React from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";

interface PlayerInfo{
    playerNames:{Player1Name:string, Player2Name:string}
}


function GameScreen(props: PlayerInfo){
    return (
        <div>
            <GameHeader playerName="Player 1"/>
            <Board/>
            <GameFooter player1Name={props.playerNames.Player1Name} player2Name={props.playerNames.Player2Name}/>
        </div>
    )
}

export { GameScreen }