import React from "react"
import "./EndGameScreen.css"
import {Link} from "react-router-dom";
import {gameResult, gameStatus} from "./GameScreenComponents/WinningLogic"

interface playerDetails{
    playerNames: {Player1Name:string, Player2Name:string};
    gameStatus: gameStatus;
    playerScores: {Player1Score: number, Player2Score: number}
}

function EndGameScreen(props:playerDetails)
{
    let playerName

    /*The Column component will always return the next player, so it will be the previous player that wins...*/
    if(props.gameStatus.playerNumber === 1)
    {
        playerName = props.playerNames.Player2Name
    }
    else
    {
        playerName =  props.playerNames.Player1Name
    }

    return (
        <div className="end-game-container">
            <div className="end-game">
                {props.gameStatus.result === gameResult.win && (
                    <>
                        <h1 className="winning-line">{playerName} won!</h1>
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
                {props.gameStatus.result === gameResult.draw && (
                    <>
                        <h1 className="winning-line">It's a draw!</h1>
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