import React from "react"

interface playerInfo{
    playerNumber: number
    inputHandler: (playerName:string) => void;
    PlayerName:string
}

function PlayerDetails({playerNumber, inputHandler, PlayerName}: playerInfo) {

    return (
        <div>
            <label htmlFor="playerName">Player {playerNumber}: </label>
            <input type="text" id="playerName" placeholder="Name" onChange={event => inputHandler(event.target.value)} value={PlayerName}/>
            <input type="color"/>
        </div>
    )
}

export default PlayerDetails