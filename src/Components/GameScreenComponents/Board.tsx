import React from "react"
import Column from "./Column"
import "../../styles/GameScreen.css"
import {numOfRows} from "../../Constants";

function Board(){
    const rowNumbers = []

    for (let i = 0; i < numOfRows; i++)
    {
        rowNumbers.push(<div>{i+1}</div>)
    }

    return (
        <div>
            <div className="Game-board">
                <div className="Column-Yaxis">
                    {rowNumbers}
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