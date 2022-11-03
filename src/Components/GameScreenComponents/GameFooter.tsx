import React from "react"
import "../GameScreen.css"
import { Link } from "react-router-dom"

interface scoreInfo{
    playerNames: {Player1Name:string, Player2Name:string}
}

function GameFooter(props: scoreInfo){
    return(
        <div className="Game-footer">
            <p>{props.playerNames.Player1Name} score: 0</p>
            <Link to="/instructions">
                <button>Instructions</button>
            </Link>
            <p>{props.playerNames.Player2Name} score: 0</p>
        </div>
    )
}

export default GameFooter