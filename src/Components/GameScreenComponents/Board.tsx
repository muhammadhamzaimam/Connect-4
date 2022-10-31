import React from "react"
import { Column } from "./Column"
import "../../styles/GameScreen.css"

function Board(){
    return (
        <div>
            <div className="Game-board">
                <div className="Column-Yaxis">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                </div>
                <Column columnNumber="A"/>
                <Column columnNumber="B"/>
                <Column columnNumber="C"/>
                <Column columnNumber="D"/>
                <Column columnNumber="E"/>
                <Column columnNumber="F"/>
                <Column columnNumber="G"/>
            </div>
        </div>
    )
}

export { Board }