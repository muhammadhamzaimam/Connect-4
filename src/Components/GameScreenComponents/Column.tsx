import React from "react"
import "../GameScreen.css"
import {numOfRows} from "../../Constants";
import checkGameStatus, {gameResult, gameStatus} from "./WinningLogic";

interface columnInfo{
    columnLetter: string
    columnNumber: number
    gameColumn: number[]
    gameBoard:number[][]
    playerColors: {Player1Color:string, Player2Color:string}
    playerCoordinates: {Column:number, Row:number}
    setPlayerCoordinates: React.Dispatch<React.SetStateAction<{Column: number, Row: number}>>
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][]}>>
    playerScores: {Player1Score: number, Player2Score: number}
    setPlayerScores:  React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

/*One of the main components that updates the state every time a player clicks on a column*/
function Column(props: columnInfo){

    const column = [];
    let endGameResult:gameStatus;

    for(let i = 0; i < numOfRows; i++)
    {
        column.push(<div className="Column-element"
                         style={{backgroundColor: props.gameColumn[i]===1 ? props.playerColors.Player1Color: props.gameColumn[i] === 2 ? props.playerColors.Player2Color : ""}}></div>)
    }

    column.push(<div className="Column-bottom">{props.columnLetter}</div>)


    function handleColumnClick(){

        for(let i = props.gameColumn.length-1; i >= 0; i--)
        {
            if(props.gameColumn[i] === 0)
            {
                props.setGameStatus( prevState => {
                    const prevGameBoard = prevState.gameBoard;
                    prevGameBoard[props.columnNumber][i] = prevState.playerNumber
                    props.setPlayerCoordinates({Column: props.columnNumber, Row:i})
                    /*Function that returns the winner along with game info*/
                    endGameResult = checkGameStatus(prevGameBoard, prevState.playerNumber, {Column: props.columnNumber, Row: i}, props.playerScores, props.setPlayerScores)
                    return {gameBoard: prevGameBoard, playerNumber: prevState.playerNumber === 1 ? 2 : 1, result: endGameResult.result}
                })
                break;
            }
        }
    }

    return(
        <div className="Column" onClick={handleColumnClick}>
            {column}
        </div>
    )
}

export default Column