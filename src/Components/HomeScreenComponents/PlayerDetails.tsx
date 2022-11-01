import React from "react"

interface playerInfo{
    playerNumber: number
    inputHandler: (event:any) => void;
}

function PlayerDetails({playerNumber, inputHandler}: playerInfo) {

    return (
        <div>
            <label htmlFor="playerName">Player {playerNumber}: </label>
            <input type="text" id="playerName" placeholder="Name" onChange={inputHandler}/>
            <input type="color"/>
        </div>
    )
}

export default PlayerDetails