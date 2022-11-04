import React from "react"
import "../GameScreen.css"
import { numOfRows } from "../../Constants";

interface columnInfo{
    columnLetter: string
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    columnNumber: number
    gameColumn: number[]
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>
    playerColors: {Player1Color:string, Player2Color:string}
    playerCoordinates: {Column:number, Row:number}
    setPlayerCoordinates: React.Dispatch<React.SetStateAction<{Column: number, Row: number}>>
}

function Column(props: columnInfo){
    const column = [];

    for(let i = 0; i < numOfRows; i++)
    {
        column.push(<div className="Column-element" style={{backgroundColor: props.gameColumn[i]===1 ? props.playerColors.Player1Color: props.gameColumn[i] === 2 ? props.playerColors.Player2Color : ""}}>{props.gameColumn[i]}</div>)
    }

    column.push(<div className="Column-bottom">{props.columnLetter}</div>)

    function handleColumnClick(){
        for(let i = props.gameColumn.length-1; i >= 0; i--)
        {
            if(props.gameColumn[i] === 0)
            {
                props.setPlayerMoveCount(prevCount => prevCount + 1);
                props.setGameBoard(prevGameBoard => {
                    if(props.playerMoveCount%2 === 1){
                        prevGameBoard[props.columnNumber][i] = 2;
                    }
                    else{
                        prevGameBoard[props.columnNumber][i] = 1;
                    }
                    props.setPlayerCoordinates({Column: props.columnNumber, Row:i})
                    return prevGameBoard;
                })
                return
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