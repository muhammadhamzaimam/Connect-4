import React from "react"
import Column from "./Column"
import "../../styles/GameScreen.css"
import {numOfColumns, numOfRows} from "../../Constants";

interface playerInfo{
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    gameBoard:number[][]
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
}

function Board(props: playerInfo) {
    const rowNumbers = []
    const columns = []

    for (let i = 0; i < numOfRows; i++) {
        rowNumbers.push(<div>{i + 1}</div>)
    }

    for (let i = 0; i < numOfColumns; i++)
    {
        columns.push(<Column columnLetter={String.fromCharCode(65+i)}
                             playerMoveCount={props.playerMoveCount} setPlayerMoveCount={props.setPlayerMoveCount}
                             gameColumn={props.gameBoard[i]} setGameBoard={props.setGameBoard} columnNumber={i}
                             playerColors={props.playerColors}/>)
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