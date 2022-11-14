import React from "react"
import "./EndGameScreen.css"
import {Link} from "react-router-dom";
import {gameResult, gameStatus} from "./GameScreenComponents/WinningLogic"
import {PlayerColors, PlayerNames, PlayerScores} from "../App";

interface playerDetails{
    playerNames: PlayerNames;
    gameStatus: gameStatus;
    playerScores: PlayerScores;
    playerColors: PlayerColors;
}

function EndGameScreen(props:playerDetails)
{
    let playerName

    if(props.gameStatus.winner === 1)
    {
        playerName = props.playerNames.Player1Name
    }
    else if(props.gameStatus.winner === 2)
    {
        playerName =  props.playerNames.Player2Name
    }
    else{
        playerName = "";
    }

    return (
        <div className="end-game-container">
            <div className="end-game">
                {props.gameStatus.result === gameResult.win && (
                    <>
                        <h1 className="winning-player-name">{playerName} won!</h1>
                        <div className="end-game-scores">
                            <p className="player-score">{props.playerNames.Player1Name} score: {props.playerScores.Player1Score}</p>
                            <p>{props.playerNames.Player2Name} score: {props.playerScores.Player2Score}</p>
                        </div>
                        <Link to="/">
                            <div>
                                <button className="home-button">Home</button>
                            </div>
                        </Link>
                    </>
                    )}
                {props.gameStatus.result === gameResult.draw && (
                    <>
                        <h1 className="winning-player-name">It's a draw!</h1>
                        <div className="end-game-scores">
                            <p className="p1-score">{props.playerNames.Player1Name} score: {props.playerScores.Player1Score}</p>
                            <p>{props.playerNames.Player2Name} score: {props.playerScores.Player2Score}</p>
                        </div>
                        <Link to="/">
                            <div>
                                <button className="home-button">Home</button>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default EndGameScreen;