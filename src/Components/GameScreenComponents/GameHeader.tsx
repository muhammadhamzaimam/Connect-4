import React from "react"

interface myProps{
    playerName: string
}

function GameHeader(props: myProps){
    return(
        <div className="Game-header">
            <h1>CONNECT-4</h1>
            <h2>Turn: {props.playerName}</h2>
        </div>
    )
}

export { GameHeader }