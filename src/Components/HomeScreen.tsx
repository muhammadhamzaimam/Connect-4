import React from "react"
import PlayerDetails from "./HomeScreenComponents/PlayerDetails"
import {Link} from "react-router-dom";
import {numOfColumns, numOfRows} from "../Constants";
import {GameResult} from "./GameScreenComponents/WinningLogic";
import {PlayerColors, PlayerNames} from "../App"

interface HomeScreenProps{
    playerNames: PlayerNames
    setPlayerNames: React.Dispatch<React.SetStateAction<{Player1Name: string, Player2Name: string}>>
    playerColors: PlayerColors
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    setGameStatus: React.Dispatch<React.SetStateAction<{result: GameResult, playerNumber: number, gameBoard: number[][], winner: number}>>
    setPlayerScores: React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

function HomeScreen({setPlayerNames, playerNames, playerColors, setPlayerColors, setGameStatus, setPlayerScores}: HomeScreenProps){

    /*When the players change name, the scores must be reset*/
    function setPlayer1Name(player1Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player1Name:player1Name}) )
        setPlayerScores( {Player1Score: 0, Player2Score: 0})
    }

    function setPlayer2Name(player2Name:string){
        setPlayerNames(prevNames => ({...prevNames,Player2Name:player2Name}) )
        setPlayerScores( {Player1Score: 0, Player2Score: 0})
    }

    function setPlayer1Color(player1Color:string){
        setPlayerColors( prevColor => ({...prevColor,Player1Color:player1Color}))
    }

    function setPlayer2Color(player2Color:string){
        setPlayerColors( prevColor => ({...prevColor,Player2Color:player2Color}))
    }

    function handleStartGame()
    {
        setGameStatus( prevState => {return {...prevState, gameBoard: Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0)), result: GameResult.ongoing, playerNumber: 1}});
    }

    return (
        <div className="main-container">
            <div className="title">
                <h1>CONNECT-4</h1>
            </div>
            <div className="player-container">
                <PlayerDetails playerNumber={1}
                               inputHandler={setPlayer1Name}
                               PlayerName={playerNames.Player1Name}
                               playerColor={playerColors.Player1Color}
                               setPlayerColor={setPlayer1Color}/>
                <PlayerDetails playerNumber={2}
                               inputHandler={setPlayer2Name}
                               PlayerName={playerNames.Player2Name}
                               playerColor={playerColors.Player2Color}
                               setPlayerColor={setPlayer2Color}/>
                <div className="buttons">
                    <Link to="/game">
                        <button onClick={handleStartGame} className = "regular-button play-button">Play</button>
                    </Link>
                    <Link to="/instructions">
                        <button className = "regular-button instruction-button">Instructions</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default HomeScreen