import React from "react"
import "../GameScreen.css"
import { Link } from "react-router-dom"

interface scoreInfo{
    playerNames: {Player1Name:string, Player2Name:string}
    playerScores: {Player1Score:number, Player2Score:number}
}

function GameFooter(props: scoreInfo){
    return(
        <div className="Game-footer">
            <p>{props.playerNames.Player1Name} score: {props.playerScores.Player1Score}</p>
            <Link to="/instructions">
                <button className = "instruction-button">Instructions</button>
            </Link>
            <p>{props.playerNames.Player2Name} score: {props.playerScores.Player2Score}</p>
        </div>
    )
}

export default GameFooter