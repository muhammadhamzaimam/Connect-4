import React, {useEffect, useState} from "react"
import Column from "./Column"
import "../GameScreen.css"
import {numOfColumns, numOfRows} from "../../Constants";

interface playerInfo{
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    gameBoard:number[][]
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
}

function Board(props: playerInfo) {

    const [playerCoordinates, setPlayerCoordinates] = useState({Column: 0, Row: 0});

    function getPlayerNumber(){
        if(props.playerMoveCount % 2 === 0){
            return 1;
        }
        else{
            return 2;
        }
    }

    /*should take in the coordinates of the current players token and the playerNumber*/
    function checkHorizontalWin(playerNumber:number){

        if(playerNumber === 0)
        {
            return false;
        }

        /*check if the same player token exists 3 steps to the right and left*/
        let rightMatches = true;
        let leftMatches = true;

        /*Check all token to the right match the token placed...*/
        for(let i = 0; i < 4; i++)
        {
            let trueColumn = playerCoordinates.Column+i

            if(trueColumn > numOfColumns-1)
            {
                break;
            }

            if(trueColumn === numOfColumns-1)
            {
                for(let i = 0; i < 4; i++)
                {
                    if(props.gameBoard[trueColumn-i][playerCoordinates.Row] !== playerNumber)
                    {
                        rightMatches = false;
                    }
                }
            }

            if(props.gameBoard[trueColumn][playerCoordinates.Row] !== playerNumber){
                rightMatches = false;
            }

        }

        /*Check all tokens to the left match the token placed...*/
        for(let i = 0; i < 4; i++)
        {
            let trueColumn = playerCoordinates.Column-i

            if(trueColumn < 0)
            {
                break;
            }

            if(trueColumn === 0)
            {
                for(let i = 0; i < 4; i++)
                {
                    if(props.gameBoard[trueColumn+i][playerCoordinates.Row] !== playerNumber)
                    {
                        leftMatches = false;
                    }
                }
            }

            if(props.gameBoard[trueColumn][playerCoordinates.Row] !== playerNumber){
                leftMatches = false;
            }
        }

        return (rightMatches || leftMatches);
    }

    function checkVerticalWin(playerNumber:number){

        if(playerNumber === 0)
        {
            return false;
        }

        let topMatches = true;
        let bottomMatches = true;

        /*Check all tokens at the bottom match the token placed...*/
        for(let i = 0; i < 4; i++)
        {
            let trueRow = playerCoordinates.Row+i

            if(trueRow > numOfRows-1)
            {
                break;
            }

            if(trueRow === numOfRows-1)
            {
                for(let i = 0; i < 4; i++)
                {
                    if(props.gameBoard[playerCoordinates.Column][trueRow-i] !== playerNumber)
                    {
                        bottomMatches = false;
                    }
                }
            }

            if(props.gameBoard[playerCoordinates.Column][trueRow] !== playerNumber){
                bottomMatches = false;
            }
        }

        /*Check all token at the top match the token placed...*/
        for(let i = 0; i < 4; i++)
        {
            let trueRow = playerCoordinates.Row-i

            if(trueRow < 0)
            {
                break;
            }

            if(trueRow === 0)
            {
                for(let i = 0; i < 4; i++)
                {
                    if(props.gameBoard[playerCoordinates.Column][trueRow+i] !== playerNumber)
                    {
                        topMatches = false;
                    }
                }
            }

            if(props.gameBoard[playerCoordinates.Column][trueRow] !== playerNumber){
                topMatches = false;
            }
        }

        return(topMatches || bottomMatches);
    }

    function checkDiagonalWin(playerNumber:number){

        if(playerNumber === 0)
        {
            return false;
        }

        /*could be diagonal rightBottom, rightTop, leftBottom, leftTop*/
        let rightBottom = true;
        let rightTop = true;
        let leftBottom = true;
        let leftTop = true;

        /*check rightBottom*/
        for(let i = 0; i < 4; i++)
        {
            if(playerCoordinates.Column+i >= numOfColumns || playerCoordinates.Row+i >= numOfRows)
            {
                break;
            }

            if(props.gameBoard[playerCoordinates.Column+i][playerCoordinates.Row+i] !== playerNumber)
            {
                rightBottom = false;
                break;
            }

            if(playerCoordinates.Column+i === numOfColumns-1)
            {
                for(let j = 0; j < 4; j++)
                {
                    if( playerCoordinates.Row +i - j < 0 ||
                        playerCoordinates.Row +i - j > numOfRows - 1 ||
                        playerCoordinates.Column +i - j < 0 ||
                        playerCoordinates.Column +i - j > numOfColumns - 1 ||
                        props.gameBoard[playerCoordinates.Column +i -j][playerCoordinates.Row +i -j] !== playerNumber )
                    {
                        rightBottom = false;
                        break;
                    }
                }
            }

            if(playerCoordinates.Row+i === numOfRows-1)
            {
                for(let j = 0; j < 4; j++)
                {
                    if( playerCoordinates.Column +i -j < 0 ||
                        props.gameBoard[playerCoordinates.Column +i -j][playerCoordinates.Row +i -j] !== playerNumber )
                    {
                        rightBottom = false;
                        break;
                    }
                }
            }
        }

        /*check leftTop*/
        for(let i = 0; i < 4; i++)
        {
            if (playerCoordinates.Column - i < 0 || playerCoordinates.Row - i < 0)
            {
                break;
            }

            if (props.gameBoard[playerCoordinates.Column - i][playerCoordinates.Row - i] !== playerNumber)
            {
                leftTop = false;
                break;
            }

            if (playerCoordinates.Column - i === 0)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Row -i + j > numOfRows - 1 ||
                        playerCoordinates.Row -i + j < 0 ||
                        playerCoordinates.Column - i + j > numOfColumns - 1 ||
                        playerCoordinates.Column - i + j < 0 ||
                        props.gameBoard[playerCoordinates.Column -i + j][playerCoordinates.Row -i + j] !== playerNumber) /*probably should be props.gameBoard[playerCoordinates-i+j][...] instead of whats there rn*/
                    {
                        leftTop = false;
                        break;
                    }
                }
            }

            if (playerCoordinates.Row - i === 0)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Column -i + j > numOfColumns - 1 ||
                        playerCoordinates.Column -i + j < 0 ||
                        playerCoordinates.Row -i + j > numOfRows - 1 ||
                        playerCoordinates.Column -i + j < 0 ||
                        props.gameBoard[playerCoordinates.Column -i + j][playerCoordinates.Row -i + j] !== playerNumber)
                    {
                        leftTop = false;
                        break;
                    }
                }
            }
        }

        /*check rightTop*/
        for(let i = 0; i < 4; i++)
        {
            if (playerCoordinates.Column + i >= numOfColumns || playerCoordinates.Row - i < 0)
            {
                break;
            }

            if (props.gameBoard[playerCoordinates.Column + i][playerCoordinates.Row - i] !== playerNumber)
            {
                rightTop = false;
                break;
            }

            if (playerCoordinates.Column + i === numOfColumns - 1)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Row - i + j > numOfRows - 1 ||
                        playerCoordinates.Row - i + j < 0 ||
                        playerCoordinates.Column + i - j > numOfColumns - 1 ||
                        playerCoordinates.Column + i - j < 0 ||
                        props.gameBoard[playerCoordinates.Column + i - j][playerCoordinates.Row - i + j] !== playerNumber)
                    {
                        rightTop = false;
                        break;
                    }
                }
            }

            if (playerCoordinates.Row - i === 0)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Column + i - j < 0 ||
                        playerCoordinates.Column + i - j > numOfColumns - 1 ||
                        playerCoordinates.Row - i + j < 0 ||
                        playerCoordinates.Row - i + j > numOfRows - 1 ||
                        props.gameBoard[playerCoordinates.Column + i - j][playerCoordinates.Row - i + j] !== playerNumber)
                    {
                        rightTop = false;
                        break;
                    }
                }
            }
        }

        /*check leftBottom*/
        for(let i = 0; i < 4; i++)
        {
            if (playerCoordinates.Column - i < 0 || playerCoordinates.Row + i > numOfRows - 1)
            {
                break;
            }

            if (props.gameBoard[playerCoordinates.Column - i][playerCoordinates.Row + i] !== playerNumber)
            {
                leftBottom = false;
                break;
            }

            if (playerCoordinates.Column - i === 0)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Row + i - j < 0 ||
                        playerCoordinates.Column - i + j < 0 ||
                        playerCoordinates.Row + i - j > numOfRows - 1 ||
                        playerCoordinates.Column - i + j > numOfColumns - 1 ||
                        props.gameBoard[playerCoordinates.Column - i + j][playerCoordinates.Row + i - j] !== playerNumber)
                    {
                        leftBottom = false;
                        break;
                    }
                }
            }

            if (playerCoordinates.Row + i === numOfRows - 1)
            {
                for (let j = 0; j < 4; j++)
                {
                    if (playerCoordinates.Column - i + j < 0 ||
                        playerCoordinates.Column - i + j > numOfColumns - 1 ||
                        playerCoordinates.Row + i - j < 0 ||
                        playerCoordinates.Row + i - j > numOfRows - 1 ||
                        props.gameBoard[playerCoordinates.Column - i + j][playerCoordinates.Row + i - j] !== playerNumber)
                    {
                        leftBottom = false;
                        break;
                    }
                }
            }
        }

        if(rightBottom)
        {
            console.log("winning rightBottom");
        }
        if(leftTop){
            console.log("winning leftTop")
        }
        if(rightTop){
            console.log("winning rightTop")
        }
        if(leftBottom){
            console.log("winning leftBottom")
        }

        return (rightBottom || leftTop || rightTop || leftBottom);
    }

    function checkPlayerWin(){
        let playerNumber = getPlayerNumber();

            //update some state variable to show popup
            if(checkDiagonalWin(playerNumber))
            {
                console.log("player won by diagonal")
            }
            if(checkVerticalWin(playerNumber))
            {
                console.log("player won by vertical")
            }
            if(checkHorizontalWin(playerNumber))
            {
                console.log("player won by horizontal")
            }


        else{
        }
    }

    useEffect(checkPlayerWin, [props.playerMoveCount]);

    /*creates the row numbers on the left side of the board*/
    const rowNumbers = Array.from({length: numOfRows}, (_,i) => <div key={i}>{i+1}</div>);

    const columns = []

    for (let i = 0; i < numOfColumns; i++)
    {
        columns.push(<Column columnLetter={String.fromCharCode(65+i)}
                             playerMoveCount={props.playerMoveCount} setPlayerMoveCount={props.setPlayerMoveCount}
                             gameColumn={props.gameBoard[i]} setGameBoard={props.setGameBoard} columnNumber={i}
                             playerColors={props.playerColors} playerCoordinates={playerCoordinates} setPlayerCoordinates={setPlayerCoordinates}/>)
    }

    return (
        <div>
            <div className="Game-board">
                <div className="Column-Yaxis">
                    {rowNumbers}
                </div>
                {columns}
            </div>
        </div>
    )
}

export default Board