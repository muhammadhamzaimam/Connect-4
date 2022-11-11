import React from "react"
import "../InstructionScreen.css"
import { Link, useNavigate } from "react-router-dom";

function Instructions(){

    const goBack = useNavigate();

    function handleBack()
    {
        /*Goes back to the screen user came from; equivalent of pressing the back button*/
        goBack(-1);
    }

    return(
        <>
            <div className="Instructions">
                <h1 className="Instruction-title">Instructions</h1>
                <p>
                    Players will take turns to place their token on the board. The aim of the game is to place
                    4 tokens in a row either horizontally, vertically or diagonally. The first player to make a
                    row of 4 wins. Good luck, have fun!
                </p>
                <Link to="/">
                    <button onClick={handleBack}>Back</button>
                </Link>
            </div>
        </>
    )
}

export default Instructions