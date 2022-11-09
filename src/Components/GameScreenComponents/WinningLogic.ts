import {numOfColumns, numOfRows} from "../../Constants";
import React from "react";

export interface gameStatus{
    result: gameResult /*win, lose, draw*/
    playerNumber: number
    gameBoard: number[][]
}

/*interface gameStatusWin extends gameStatus{
    playerNumber: number
}*/

export enum gameResult{
    win,
    draw,
    ongoing
}

function checkGameStatus(gameBoard:number[][], playerNumber:number, playerCoordinates:{Column:number, Row:number}, playerScores:{Player1Score:number, Player2Score:number}, setPlayerScores:React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>):gameStatus
{
    /*check if winner by calling checkHorizontal/checkVertical/checkDiagonal
    * if so, return gameResult.win
    *
    * if not, check if its a draw (full board), then return gameResult.draw
    *
    * otherwise, return gameResult.ongoing*/
    let horizontalWin = checkHorizontalWin(playerNumber, playerCoordinates, gameBoard);
    let verticalWin = checkVerticalWin(playerNumber, playerCoordinates, gameBoard);
    let diagonalWin = checkDiagonalWin(playerNumber, playerCoordinates, gameBoard);

    if(horizontalWin || verticalWin || diagonalWin)
    {
        if(playerNumber === 1)
        {
            setPlayerScores(prevScore => {
                return {Player1Score: prevScore.Player1Score+1, Player2Score: prevScore.Player2Score};
            })
        }

        else if(playerNumber === 2)
        {
            setPlayerScores(prevScore => {
                return {Player1Score: prevScore.Player1Score, Player2Score: prevScore.Player2Score+1};
            })
        }

        return ({result:gameResult.win, playerNumber:playerNumber, gameBoard: gameBoard});
    }

    else if(isDraw(gameBoard)){
        return ({result:gameResult.draw, playerNumber: playerNumber, gameBoard: gameBoard})
    }

    else{
        return ({result:gameResult.ongoing, playerNumber: playerNumber, gameBoard: gameBoard})
    }

}

function checkHorizontalWin(playerNumber:number, playerCoordinates:{Column:number, Row:number}, gameBoard:number[][]){

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
                if(gameBoard[trueColumn-i][playerCoordinates.Row] !== playerNumber)
                {
                    rightMatches = false;
                }
            }
        }

        if(gameBoard[trueColumn][playerCoordinates.Row] !== playerNumber){
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
                if(gameBoard[trueColumn+i][playerCoordinates.Row] !== playerNumber)
                {
                    leftMatches = false;
                }
            }
        }

        if(gameBoard[trueColumn][playerCoordinates.Row] !== playerNumber){
            leftMatches = false;
        }
    }

    return (rightMatches || leftMatches);
}

function checkVerticalWin(playerNumber:number, playerCoordinates:{Column:number, Row:number}, gameBoard:number[][]){

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
                if(gameBoard[playerCoordinates.Column][trueRow-i] !== playerNumber)
                {
                    bottomMatches = false;
                }
            }
        }

        if(gameBoard[playerCoordinates.Column][trueRow] !== playerNumber){
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
                if(gameBoard[playerCoordinates.Column][trueRow+i] !== playerNumber)
                {
                    topMatches = false;
                }
            }
        }

        if(gameBoard[playerCoordinates.Column][trueRow] !== playerNumber){
            topMatches = false;
        }
    }

    return(topMatches || bottomMatches);
}

function checkDiagonalWin(playerNumber:number, playerCoordinates:{Column:number, Row:number}, gameBoard:number[][]){

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

        if(gameBoard[playerCoordinates.Column+i][playerCoordinates.Row+i] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column +i -j][playerCoordinates.Row +i -j] !== playerNumber )
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
                    playerCoordinates.Column +i -j > numOfColumns - 1 ||
                    playerCoordinates.Row +i -j < 0 ||
                    playerCoordinates.Row +i -j > numOfRows - 1 ||
                    gameBoard[playerCoordinates.Column +i -j][playerCoordinates.Row +i -j] !== playerNumber )
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

        if (gameBoard[playerCoordinates.Column - i][playerCoordinates.Row - i] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column -i + j][playerCoordinates.Row -i + j] !== playerNumber) /*probably should be props.gameBoard[playerCoordinates-i+j][...] instead of whats there rn*/
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
                    gameBoard[playerCoordinates.Column -i + j][playerCoordinates.Row -i + j] !== playerNumber)
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

        if (gameBoard[playerCoordinates.Column + i][playerCoordinates.Row - i] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column + i - j][playerCoordinates.Row - i + j] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column + i - j][playerCoordinates.Row - i + j] !== playerNumber)
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

        if (gameBoard[playerCoordinates.Column - i][playerCoordinates.Row + i] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column - i + j][playerCoordinates.Row + i - j] !== playerNumber)
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
                    gameBoard[playerCoordinates.Column - i + j][playerCoordinates.Row + i - j] !== playerNumber)
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

function isDraw(gameBoard:number[][])
{
    for(let i = 0; i < numOfColumns; i++)
    {
        for(let j = 0; j < numOfRows; j++)
        {
            if(gameBoard[i][j] === 0)
            {
                return false;
            }
        }
    }
    return true;
}

/*Within the react component, after a token is placed, checkGameStatus is called
*
* in Board.tsx
* const status = checkGameStatus(gameBoard, playerNumber);
*
* if(status.result === gameResult.win)
*   setShowEndGameScreen(true);
*   show winning line
*
* else if(status.result === gameResult.draw)
*   update state to show draw on end game screen
*   setIsDraw(true);
*   setGameResult("")
*
* */

export default checkGameStatus