import React from "react"

function Instructions(){
    return(
        <div>
            <h1>Instructions</h1>
            <p>
                Players will take turns to place their token on the board. The aim of the game is to place
                4 tokens in a row either horizontally, vertically or diagonally. The first player to make a
                row of 4 wins. Good luck, have fun!
            </p>
            <button>Back</button>
        </div>
    )
}

export { Instructions }