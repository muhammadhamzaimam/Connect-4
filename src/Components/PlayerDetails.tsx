import React from "react"

function PlayerDetails(props: any){
    return (
        <div>
            <label htmlFor="player1Name">Player {props.playerNumber}: </label>
            <input type="text" id="player1Name" placeholder="Name"/>
        </div>
    )
}

export { PlayerDetails }