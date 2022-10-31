import React, {useState} from "react"

interface myProps{
    playerNumber: number
    inputHandler: (event:any) => void;
}

function PlayerDetails({playerNumber, inputHandler}: myProps) {

    return (
        <div>
            <label htmlFor="playerName">Player {playerNumber}: </label>
            <input type="text" id="playerName" placeholder="Name" onChange={inputHandler}/>
            <input type="color"/>
        </div>
    )
}

export { PlayerDetails }