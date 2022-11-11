import React from "react"
import "../../styles/GameScreen.css"
import { Link } from "react-router-dom"

interface scoreInfo{
    player1Name: string
    player2Name: string
}

function GameFooter(props: scoreInfo){
    return(
        <div className="Game-footer">
            <p>{props.player1Name} score: 0</p>
            <Link to="/instructions">
                <button>Instructions</button>
            </Link>
            <p>{props.player2Name} score: 0</p>
        </div>
    )
}

export default GameFooter