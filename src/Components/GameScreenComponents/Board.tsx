import React, {useState} from "react"
import Column from "./Column"
import "../GameScreen.css"
import {numOfColumns, numOfRows} from "../../Constants";
import {gameResult} from "./WinningLogic";

interface playerInfo{
    gameBoard:number[][]
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][]}>>
    playerScores: {Player1Score: number, Player2Score: number}
    setPlayerScores:  React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

function Board(props: playerInfo) {

    const [playerCoordinates, setPlayerCoordinates] = useState({Column: 0, Row: 0});

    /*creates the row numbers on the left side of the board*/
    const rowNumbers = Array.from({length: numOfRows}, (_,i) => <div key={i}>{i+1}</div>);

    const columns = []

    /*Push each column into an array to be rendered. This includes the 1st column which is basically the row letters*/
    for (let i = 0; i < numOfColumns; i++)
    {
        columns.push(<Column columnLetter={String.fromCharCode(65+i)}
                             gameColumn={props.gameBoard[i]}
                             gameBoard={props.gameBoard}
                             columnNumber={i}
                             playerColors={props.playerColors}
                             playerCoordinates={playerCoordinates}
                             setPlayerCoordinates={setPlayerCoordinates}
                             gameStatus={props.gameStatus}
                             setGameStatus={props.setGameStatus}
                             playerScores={props.playerScores}
                             setPlayerScores={props.setPlayerScores}/>)
    }

    return (
        <div>
            <div className="Game-board">
                <div className="Column-Yaxis">
                    {rowNumbers}
                </div>
                {columns}
            </div>
        </div>
    )
}

export default Board