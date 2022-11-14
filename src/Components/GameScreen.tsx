import React from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";
import EndGameScreen from "./EndGameScreen"
import {GameResult} from "./GameScreenComponents/WinningLogic";
import {PlayerColors, PlayerNames, PlayerScores} from "../App";

interface PlayerInfo{
    playerNames: PlayerNames
    gameStatus: {result: GameResult, playerNumber: number, gameBoard: number[][], winner: number}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: GameResult, playerNumber: number, gameBoard: number[][], winner: number}>>
    playerColors: PlayerColors
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    playerScores: PlayerScores
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
                {(props.gameStatus.result !== GameResult.ongoing) && <EndGameScreen playerNames={props.playerNames}
                                                                                    gameStatus={props.gameStatus}
                                                                                    playerScores={props.playerScores}
                                                                                    playerColors={props.playerColors}/>}
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