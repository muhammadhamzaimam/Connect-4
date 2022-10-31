import React, {useState} from "react"
import { PlayerDetails } from "./HomeScreenComponents/PlayerDetails"
import { Link } from "react-router-dom";

interface homeScreenProps{
    onPlayButtonClick: (player1Name:string, player2Name:string) => void;
}

function HomeScreen({onPlayButtonClick}: homeScreenProps){

    const[player1Name, setPlayer1Name] = useState("");
    const[player2Name, setPlayer2Name] = useState("");

    function handlePlayer1Input(event:any){
        setPlayer1Name(event.target.value)
    }

    function handlePlayer2Input(event:any){
        setPlayer2Name(event.target.value)
    }

    return (
        <div>
            <h1>CONNECT-4</h1>
            <PlayerDetails playerNumber={1} inputHandler={handlePlayer1Input}/>
            <PlayerDetails playerNumber={2} inputHandler={handlePlayer2Input}/>
            <Link to="/game">
                <button onClick={() => onPlayButtonClick(player1Name, player2Name)}>Play</button>
            </Link>
            <Link to="/instructions">
                <button>Instructions</button>
            </Link>
        </div>
    )
}

export { HomeScreen }