import React from "react"
import "../../styles/GameScreen.css"
import { numOfRows } from "../../Constants";

interface columnInfo{
    columnLetter: string
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    columnNumber: number
    gameColumn: number[]
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>
}

function Column(props: columnInfo){
    const column = [];

    for(let i = 0; i < numOfRows; i++)
    {
        column.push(<div className="Column-element" style={{backgroundColor: props.gameColumn[i]===1 ? "red": props.gameColumn[i] === 2 ? "yellow" : ""}}>{props.gameColumn[i]}</div>)
    }

    column.push(<div className="Column-bottom">{props.columnLetter}</div>)

    function handleColumnClick(){
        for(let i = props.gameColumn.length-1; i >= 0; i--)
        {
            if(props.gameColumn[i] === 0)
            {
                props.setPlayerMoveCount(prevCount => prevCount + 1);
                props.setGameBoard(prevGameBoard => {
                    prevGameBoard[props.columnNumber][i] = 1;
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