import {numOfColumns, numOfRows} from "../../Constants";

export interface GameStatus {
    result: GameResult /*win, lose, draw*/
    playerNumber: number
    gameBoard: number[][]
    winner: number
}

export enum GameResult{
    win,
    draw,
    ongoing
}


/*Checks if there is a winner. If so, it returns a gameStatus object containing the winner. If not, it checks if the game was a draw. If none of the above, it returns
* a gameStatus object with result of ongoing*/

function checkGameStatus(gameBoard:number[][], playerNumber:number, playerCoordinates:{Column:number, Row:number}):GameStatus
{
    let horizontalWin = checkHorizontalWin(playerNumber, playerCoordinates, gameBoard);
    let verticalWin = checkVerticalWin(playerNumber, playerCoordinates, gameBoard);
    let diagonalWin = checkDiagonalWin(playerNumber, playerCoordinates, gameBoard);

    if(horizontalWin || verticalWin || diagonalWin)
    {
        return {result:GameResult.win, playerNumber:playerNumber, gameBoard: gameBoard, winner: playerNumber};
    }

    else if(isBoardFull(gameBoard)){
        return {result:GameResult.draw, playerNumber: playerNumber, gameBoard: gameBoard, winner: 0};
    }

    else{
        return {result:GameResult.ongoing, playerNumber: playerNumber, gameBoard: gameBoard, winner: 0};
    }
}

function checkHorizontalWin(playerNumber:number, playerCoordinates:{Column:number, Row:number}, gameBoard:number[][]){

    let rightMatches = 0;
    let leftMatches = 0;

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

    //Go 4 tokens to the left...but skip the current token position as it's already been accounted for
    for(let i = 1; i < 4; i++)
    {
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

    //Go 4 tokens to the top...but skip current token position as its already been accounted for
    for(let i = 1; i < 4; i++)
    {
        let trueRow = playerCoordinates.Row - i;

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

    return (rightBottom || leftTop || rightTop || leftBottom);
}

function isBoardFull(gameBoard:number[][])
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