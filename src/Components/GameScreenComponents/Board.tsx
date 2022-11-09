import React, {useState} from "react"
import Column from "./Column"
import "../GameScreen.css"
import {numOfColumns, numOfRows} from "../../Constants";
import {gameResult} from "./WinningLogic";

interface playerInfo{
    gameBoard:number[][]
    playerColors:{Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][]}>>
    playerScores: {Player1Score: number, Player2Score: number}
    setPlayerScores:  React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

function Board(props: playerInfo) {

    const [playerCoordinates, setPlayerCoordinates] = useState({Column: 0, Row: 0});

    /*function getPlayerNumber(){
        if(props.playerMoveCount % 2 === 0){
            return 1;
        }
        else{
            return 2;
        }
    }*/

    /*should take in the coordinates of the current players token and the playerNumber*/

    /*function checkPlayerWin(){
        let playerNumber = props.currentPlayer;

        let gameStatus = checkGameStatus(props.gameBoard, playerNumber, playerCoordinates);

        if( gameStatus.result === gameResult.win )
        {
            props.setGameStatus(prevGameStatus => { return {...prevGameStatus, result: gameResult.win}});
        }

        else if(gameStatus.result === gameResult.draw)
        {
            props.setGameStatus(prevGameStatus => { return {...prevGameStatus, result: gameResult.draw}});
        }
    }

    useEffect(checkPlayerWin, [props, playerCoordinates]);*/

    /*creates the row numbers on the left side of the board*/
    const rowNumbers = Array.from({length: numOfRows}, (_,i) => <div key={i}>{i+1}</div>);

    const columns = []

    for (let i = 0; i < numOfColumns; i++)
    {
        columns.push(<Column columnLetter={String.fromCharCode(65+i)}
                             gameColumn={props.gameBoard[i]}
                             gameBoard={props.gameBoard}
                             columnNumber={i}
                             playerColors={props.playerColors}
                             playerCoordinates={playerCoordinates}
                             setPlayerCoordinates={setPlayerCoordinates}
                             gameStatus={props.gameStatus}
                             setGameStatus={props.setGameStatus}
                             playerScores={props.playerScores}
                             setPlayerScores={props.setPlayerScores}/>)
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