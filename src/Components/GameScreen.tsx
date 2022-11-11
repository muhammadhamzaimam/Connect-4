import React from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";
import EndGameScreen from "./EndGameScreen"
import {gameResult} from "./GameScreenComponents/WinningLogic";

interface PlayerInfo{
    playerNames: {Player1Name:string, Player2Name:string}
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][]}>>
    playerColors: {Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    playerScores: {Player1Score: number, Player2Score: number}
    setPlayerScores: React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

function GameScreen(props: PlayerInfo){

    let playerName

    if(props.gameStatus.playerNumber === 2)
    {
        playerName = props.playerNames.Player2Name;
    }
    else{
        playerName = props.playerNames.Player1Name
    }

        return(
            <div>
                {(props.gameStatus.result !== gameResult.ongoing) && <EndGameScreen playerNames={props.playerNames}
                                                                                    gameStatus={props.gameStatus}
                                                                                    playerScores={props.playerScores}
                                                                                    playerColors={props.playerColors}
                                                                                    setPlayerColors={props.setPlayerColors}/>}
                <GameHeader playerName={playerName}/>
                <Board gameBoard={props.gameStatus.gameBoard}
                       playerColors={props.playerColors}
                       setPlayerColors={props.setPlayerColors}
                       gameStatus={props.gameStatus}
                       setGameStatus={props.setGameStatus}
                       playerScores={props.playerScores}
                       setPlayerScores={props.setPlayerScores}/>
                <GameFooter playerNames={props.playerNames}
                            playerScores={props.playerScores}/>
            </div>
        )
}

export default GameScreen