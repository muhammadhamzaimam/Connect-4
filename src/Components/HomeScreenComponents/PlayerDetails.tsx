import React from "react"

interface myProps{
    playerNumber: number
}

function PlayerDetails(props: myProps) {
    return (
        <div>
            <label htmlFor="playerName">Player {props.playerNumber}: </label>
            <input type="text" id="playerName" placeholder="Name"/>
            <input type="color"/>
        </div>
    )
}

export { PlayerDetails }