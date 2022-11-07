import React, {useState} from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";
import {numOfPlayers} from "../Constants";
import EndGameScreen from "./EndGameScreen"
import {gameResult} from "./GameScreenComponents/WinningLogic";

interface PlayerInfo{
    playerNames:{Player1Name:string, Player2Name:string}
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    gameBoard: number[][]
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
}

function GameScreen(props: PlayerInfo){

    const[showEndGame, setShowEndGame] = useState(false);
    const[playerNumber, setPlayerNumber] = useState(0);
    const[gameStatus, setGameStatus] = useState(gameResult.ongoing);

    let playerName

    if(props.playerMoveCount % numOfPlayers)
    {
        playerName = props.playerNames.Player2Name;
    }
    else{
        playerName = props.playerNames.Player1Name
    }

        return(
            <div>
                {showEndGame && <EndGameScreen playerNumber={playerNumber} playerNames={props.playerNames} gameStatus={gameStatus}/>}
                <GameHeader playerName={playerName}/>
                <Board playerMoveCount={props.playerMoveCount} setPlayerMoveCount={props.setPlayerMoveCount} gameBoard={props.gameBoard}
                       setGameBoard={props.setGameBoard} playerColors={props.playerColors} setPlayerColors={props.setPlayerColors} showEndGame={showEndGame}
                       setShowEndGame={setShowEndGame} setPlayerNumber={setPlayerNumber} setGameStatus={setGameStatus}/>
                <GameFooter playerNames={props.playerNames}/>
            </div>
        )
}

export default GameScreen