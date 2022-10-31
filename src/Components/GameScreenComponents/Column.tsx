import React from "react"
import "../../styles/GameScreen.css"

interface myProps{
    columnNumber: string
}

function Column(props: myProps){
    return(
        <div className="Column">
            <div className="Column-element"></div>
            <div className="Column-element"></div>
            <div className="Column-element"></div>
            <div className="Column-element"></div>
            <div className="Column-element"></div>
            <div className="Column-element"></div>
            <div className="Column-bottom">{props.columnNumber}</div>
        </div>
    )
}

export { Column }