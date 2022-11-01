import React from "react"
import Column from "./Column"
import "../../styles/GameScreen.css"
import {numOfRows} from "../../Constants";

function Board(){
    const rows = []

    for (let i = 0; i < numOfRows; i++)
    {
        rows.push(<div>{i+1}</div>)
    }

    return (
        <div>
            <div className="Game-board">
                <div className="Column-Yaxis">
                    {rows}
                </div>
                <Column columnLetter="A"/>
                <Column columnLetter="B"/>
                <Column columnLetter="C"/>
                <Column columnLetter="D"/>
                <Column columnLetter="E"/>
                <Column columnLetter="F"/>
                <Column columnLetter="G"/>
            </div>
        </div>
    )
}

export default Board