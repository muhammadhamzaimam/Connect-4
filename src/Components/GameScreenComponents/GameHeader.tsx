import React from "react"

interface PlayerInfo{
    playerName: string
}

function GameHeader(props: PlayerInfo){
    return(
        <div className="Game-header">
            <h1>CONNECT-4</h1>
            <h2>Turn: {props.playerName}</h2>
        </div>
    )
}

export default GameHeader