import React from "react"
import PlayerDetails from "./HomeScreenComponents/PlayerDetails"
import { Link } from "react-router-dom";
import {numOfColumns, numOfRows} from "../Constants";

interface homeScreenProps{
    playerNames:{Player1Name:string, Player2Name:string}
    setPlayerNames: React.Dispatch<React.SetStateAction<{Player1Name: string, Player2Name: string}>>
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
}

function HomeScreen({setPlayerNames, playerNames, setPlayerColors, setGameBoard}: homeScreenProps){

    function setPlayer1Name(player1Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player1Name:player1Name}) )
    }

    function setPlayer2Name(player2Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player2Name:player2Name}) )
    }

    function setPlayer1Color(player1Color:string){
        setPlayerColors( prevColor => ({...prevColor,Player1Color:player1Color}))
    }

    function setPlayer2Color(player2Color:string){
        setPlayerColors( prevColor => ({...prevColor,Player2Color:player2Color}))
    }

    function handleStartGame()
    {
        setGameBoard(Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0)));
    }

    return (
        <div className="main-container">
            <h1>CONNECT-4</h1>
            <div className="player-container">
                <PlayerDetails playerNumber={1} inputHandler={setPlayer1Name} PlayerName={playerNames.Player1Name} setPlayerColor={setPlayer1Color}/>
                <PlayerDetails playerNumber={2} inputHandler={setPlayer2Name} PlayerName={playerNames.Player2Name} setPlayerColor={setPlayer2Color}/>
                <Link to="/game">
                    <button onClick={handleStartGame}>Play</button>
                </Link>
                <Link to="/instructions">
                    <button>Instructions</button>
                </Link>
            </div>
        </div>
    )
}

export default HomeScreen