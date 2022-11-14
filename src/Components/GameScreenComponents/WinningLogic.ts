import {numOfColumns, numOfRows} from "../../Constants";
import React from "react";

export interface gameStatus{
    result: gameResult /*win, lose, draw*/
    playerNumber: number
    gameBoard: number[][]
}

export enum gameResult{
    win,
    draw,
    ongoing
}


/*Checks if there is a winner. If so, it returns a gameStatus object containing the winner. If not, it checks if the game was a draw. If none of the above, it returns
* a gameStatus object with result of ongoing*/

function checkGameStatus(gameBoard:number[][], playerNumber:number, playerCoordinates:{Column:number, Row:number}, playerScores:{Player1Score:number, Player2Score:number}, setPlayerScores:React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>):gameStatus
{
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

    let rightMatches = 0;
    let leftMatches = 0;

    if(playerNumber === 0)
    {
        return false;
    }

    //Go 4 tokens to the right...
    for(let i = 0; i < 4; i++)
    {
        let trueColumn = playerCoordinates.Column + i;

        if (trueColumn > numOfColumns - 1)
        {
            break;
        }

        if(gameBoard[trueColumn][playerCoordinates.Row] === playerNumber)
        {
            rightMatches++;
        }
    }

    //Go 4 tokens to the left...
    for(let i = 0; i < 4; i++)
    {
        if(i === 0)
        {
            continue;
        }

        let trueColumn = playerCoordinates.Column - i;

        if(trueColumn < 0)
        {
            break;
        }

        if(gameBoard[trueColumn][playerCoordinates.Row] === playerNumber)
        {
            leftMatches++;
        }
    }

    return (leftMatches + rightMatches >= 4);
}

function checkVerticalWin(playerNumber:number, playerCoordinates:{Column:number, Row:number}, gameBoard:number[][]){

    let topMatches = 0;
    let bottomMatches = 0;

    if(playerNumber === 0)
    {
        return false;
    }

    //Go 4 tokens to the bottom...
    for(let i = 0; i < 4; i++)
    {
        let trueRow = playerCoordinates.Row + i;

        if(trueRow > numOfRows - 1)
        {
            break;
        }

        if(gameBoard[playerCoordinates.Column][trueRow] === playerNumber)
        {
            bottomMatches++;
        }
    }

    //Go 4 tokens to the top...
    for(let i = 0; i < 4; i++)
    {
        let trueRow = playerCoordinates.Row - i;

        if(i === 0)
        {
            continue;
        }

        if(trueRow < 0)
        {
            break;
        }

        if(gameBoard[playerCoordinates.Column][trueRow] === playerNumber)
        {
            topMatches++;
        }
    }

    return(topMatches + bottomMatches >= 4);

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

export default checkGameStatus