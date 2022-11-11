import React from "react"

interface playerInfo{
    playerName: string
}

function GameHeader(props: playerInfo){
    return(
        <div className="Game-header">
            <h1>CONNECT-4</h1>
            <h2>Turn: {props.playerName}</h2>
        </div>
    )
}

export default GameHeader