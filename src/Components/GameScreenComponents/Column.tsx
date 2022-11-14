import React from "react"
import "../GameScreen.css"
import {numOfRows} from "../../Constants";
import checkGameStatus, {gameResult, gameStatus} from "./WinningLogic";
import {PlayerColors, PlayerScores} from "../../App";

interface columnInfo{
    columnLetter: string
    columnNumber: number
    gameColumn: number[]
    gameBoard:number[][]
    playerColors: PlayerColors
    playerCoordinates: {Column:number, Row:number}
    setPlayerCoordinates: React.Dispatch<React.SetStateAction<{Column: number, Row: number}>>
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][], winner: number}>>
    playerScores: PlayerScores
    setPlayerScores:  React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

/*One of the main components that updates the state every time a player clicks on a column*/
function Column(props: columnInfo){

    const column = [];

    for(let i = 0; i < numOfRows; i++)
    {
        column.push(<div className="Column-element"
                         style={{backgroundColor: props.gameColumn[i]===1 ? props.playerColors.Player1Color: props.gameColumn[i] === 2 ? props.playerColors.Player2Color : ""}}></div>)
    }

    column.push(<div className="Column-bottom">{props.columnLetter}</div>)


    function handleColumnClick(){
        let endGameResult:gameStatus;

        for(let i = props.gameColumn.length-1; i >= 0; i--)
        {
            if(props.gameColumn[i] === 0)
            {
                props.setPlayerCoordinates({Column: props.columnNumber, Row:i})
                props.setGameStatus( prevState => {
                    const prevGameBoard = prevState.gameBoard;
                    prevGameBoard[props.columnNumber][i] = prevState.playerNumber
                    /*Function that returns the winner along with game info*/
                    endGameResult = checkGameStatus(prevGameBoard, prevState.playerNumber, {Column: props.columnNumber, Row: i})
                    if(endGameResult.result === gameResult.win)
                    {
                        if(prevState.playerNumber === 1)
                        {
                            props.setPlayerScores(prevScore => {
                                return {Player1Score: prevScore.Player1Score + 1, Player2Score: prevScore.Player2Score};
                            })
                        }

                        else if(prevState.playerNumber === 2)
                        {
                            props.setPlayerScores(prevScore => {
                                return {Player1Score: prevScore.Player1Score, Player2Score: prevScore.Player2Score + 1};
                            })
                        }
                    }
                    return {gameBoard: prevGameBoard, playerNumber: prevState.playerNumber === 1 ? 2 : 1, result: endGameResult.result, winner: endGameResult.winner}
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