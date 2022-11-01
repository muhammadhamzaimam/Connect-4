import React from "react"
import PlayerDetails from "./HomeScreenComponents/PlayerDetails"
import { Link } from "react-router-dom";

interface homeScreenProps{
    playerNames:{Player1Name:string, Player2Name:string}
    setPlayerNames: React.Dispatch<React.SetStateAction<{Player1Name: string, Player2Name: string}>>
}

function HomeScreen({setPlayerNames, playerNames}: homeScreenProps){

    function setPlayer1Name(player1Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player1Name:player1Name}) )
    }

    function setPlayer2Name(player2Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player2Name:player2Name}) )
    }

    return (
        <div>
            <h1>CONNECT-4</h1>
            <PlayerDetails playerNumber={1} inputHandler={setPlayer1Name} PlayerName={playerNames.Player1Name}/>
            <PlayerDetails playerNumber={2} inputHandler={setPlayer2Name} PlayerName={playerNames.Player2Name}/>
            <Link to="/game">
                <button>Play</button>
            </Link>
            <Link to="/instructions">
                <button>Instructions</button>
            </Link>
        </div>
    )
}

export { HomeScreen }