import React from "react"
import { PlayerDetails } from "./PlayerDetails"

function HomeScreen(){
    return (
        <div>
            <h1>CONNECT-4</h1>
            <PlayerDetails playerNumber="1"/>
            <PlayerDetails playerNumber="2"/>
        </div>

    )
}

export { HomeScreen }