import React from "react"
import "./EndGameScreen.css"
import {Link} from "react-router-dom";
import {gameStatus, gameResult} from "./GameScreenComponents/WinningLogic"

interface playerDetails{
    playerNames: {Player1Name:string, Player2Name:string};
    gameStatus: gameStatus;
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

    /*TODO: conditional rendering here...*/
    if(props.gameStatus.result === gameResult.win)
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

    else if(props.gameStatus.result === gameResult.draw){
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