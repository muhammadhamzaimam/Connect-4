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
    const columnCells = [];

    for(let i = 0; i < numOfRows; i++)
    {
        columnCells.push(<div className="Column-element">{props.gameColumn[i]}</div>)
    }

    columnCells.push(<div className="Column-bottom">{props.columnLetter}</div>)

    function handleColumnClick(){
        props.setPlayerMoveCount(prevCount => prevCount + 1)

        for(let i = props.gameColumn.length-1; i >= 0; i--)
        {
            if(props.gameColumn[i] === 0)
            {
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
            {columnCells}
        </div>
    )
}

export default Column