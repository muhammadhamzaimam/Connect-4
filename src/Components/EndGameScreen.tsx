import React from "react"
import "./EndGameScreen.css"
import {Link} from "react-router-dom";
import {gameResult} from "./GameScreenComponents/WinningLogic";


interface playerDetails{
    playerNumber: number;
    playerNames: {Player1Name:string, Player2Name:string};
    gameStatus: gameResult;
}

function EndGameScreen(props:playerDetails)
{
    let playerName = ""

    if(props.playerNumber === 1)
    {
        playerName = props.playerNames.Player1Name
    }
    else if(props.playerNumber === 2)
    {
        playerName =  props.playerNames.Player2Name
    }

    if(props.gameStatus === gameResult.win)
    {
        return(
            <div className="end-game-container">
                <div className="end-game">
                    <p>{playerName} won!</p>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </div>
            </div>
        )
    }

    else if(props.gameStatus === gameResult.draw){
        return(
            <div className="end-game-container">
                <div className="end-game">
                    <p>It's a draw!</p>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </div>
            </div>
        )
    }

    else{
        return(
            <div className="end-game-container">
            </div>
        )
    }

}

export default EndGameScreen;