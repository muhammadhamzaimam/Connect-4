import React from "react"
import "../../styles/GameScreen.css"
import { numOfRows } from "../../Constants";

interface columnInfo{
    columnLetter: string
}

function Column(props: columnInfo){
    const columns = [];

    for(let i = 0; i < numOfRows; i++)
    {
        columns.push(<div className="Column-element"></div>)
    }

    columns.push(<div className="Column-bottom">{props.columnLetter}</div>)

    return(
        <div className="Column">
            {columns}
        </div>
    )
}

export default Column