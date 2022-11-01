import React from "react"
import "../../styles/InstructionScreen.css"
import { Link } from "react-router-dom";

function Instructions(){
    return(
        <div>
            <div className="Instructions">
                <h1 className="Instruction-title">Instructions</h1>
                <p>
                    Players will take turns to place their token on the board. The aim of the game is to place
                    4 tokens in a row either horizontally, vertically or diagonally. The first player to make a
                    row of 4 wins. Good luck, have fun!
                </p>
                <Link to="/">
                    <button>Back</button>
                </Link>
            </div>
        </div>
    )
}

export default Instructions