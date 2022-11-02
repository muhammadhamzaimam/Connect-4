import React from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";
import {numOfPlayers} from "../Constants";

interface PlayerInfo{
    playerNames:{Player1Name:string, Player2Name:string}
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    gameBoard: number[][]
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
}

function GameScreen(props: PlayerInfo){

    let playerName

    if(props.playerMoveCount % numOfPlayers)
    {
        playerName = props.playerNames.Player2Name;
    }
    else{
        playerName = props.playerNames.Player1Name
    }

    return (
        <div>
            <GameHeader playerName={playerName}/>
            <Board playerMoveCount={props.playerMoveCount} setPlayerMoveCount={props.setPlayerMoveCount} gameBoard={props.gameBoard}
                   setGameBoard={props.setGameBoard}/>
            <GameFooter player1Name={props.playerNames.Player1Name} player2Name={props.playerNames.Player2Name}/>
        </div>
    )
}

export default GameScreen