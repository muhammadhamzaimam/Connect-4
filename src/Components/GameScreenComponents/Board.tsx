import React, {useEffect, useState} from "react"
import Column from "./Column"
import "../GameScreen.css"
import {numOfColumns, numOfRows} from "../../Constants";
import checkGameStatus, {gameResult} from "./WinningLogic";

interface playerInfo{
    playerMoveCount: number
    setPlayerMoveCount: React.Dispatch<React.SetStateAction<number>>
    gameBoard:number[][]
    setGameBoard:  React.Dispatch<React.SetStateAction<number[][]>>
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    showEndGame: boolean
    setShowEndGame: React.Dispatch<React.SetStateAction<boolean>>
    setPlayerNumber: React.Dispatch<React.SetStateAction<number>>
    setGameStatus: React.Dispatch<React.SetStateAction<gameResult>>
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

    function checkPlayerWin(){
        let playerNumber = getPlayerNumber();
        props.setPlayerNumber(playerNumber);

        let gameStatus = checkGameStatus(props.gameBoard, playerNumber, playerCoordinates);

            //update some state variable to show popup
            if( gameStatus.result === gameResult.win )
            {
                props.setGameStatus(gameResult.win);
                props.setShowEndGame(true);
            }

            else if(gameStatus.result === gameResult.draw)
            {
                props.setGameStatus(gameResult.draw);
                props.setShowEndGame(true);
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