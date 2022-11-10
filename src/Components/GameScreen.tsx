import React from "react"
import Board from "./GameScreenComponents/Board"
import GameHeader from "./GameScreenComponents/GameHeader";
import GameFooter from "./GameScreenComponents/GameFooter";
import EndGameScreen from "./EndGameScreen"
import {gameResult} from "./GameScreenComponents/WinningLogic";

interface PlayerInfo{
    playerNames: {Player1Name:string, Player2Name:string}
    gameStatus: {result: gameResult, playerNumber: number, gameBoard: number[][]}
    setGameStatus: React.Dispatch<React.SetStateAction<{result: gameResult, playerNumber: number, gameBoard: number[][]}>>
    playerColors: {Player1Color:string, Player2Color:string}
    setPlayerColors: React.Dispatch<React.SetStateAction<{Player1Color: string, Player2Color: string}>>
    playerScores: {Player1Score: number, Player2Score: number}
    setPlayerScores: React.Dispatch<React.SetStateAction<{Player1Score: number, Player2Score: number}>>
}

/*enum updateGameStatusKind{
    UPDATE_PLAYER = "updatePlayer",
    UPDATE_RESULT = "updateResult",
    UPDATE_GAME_BOARD = "updateGameBoard"
}

interface actions{
    type: updateGameStatusKind;
    newCurrentPlayer: number;
    newGameBoard: number[][];
    newGameState: gameStatus;
}*/



function GameScreen(props: PlayerInfo){

    /*function reducer(newGameStatus:gameStatus, action:actions)
    {
        if(action.type === updateGameStatusKind.UPDATE_PLAYER)
        {
            props.setCurrentPlayer(action.newCurrentPlayer);
        }

        else if(action.type === updateGameStatusKind.UPDATE_GAME_BOARD)
        {
            props.setGameBoard(action.newGameBoard);
        }

        return newGameStatus;
    }*/

    /*const[gameStatus, setGameStatus] = useState({result: gameResult.ongoing, playerNumber: 1, gameBoard:Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0))});*/
    /*const[newGameStatus, dispatch] = useReducer(reducer, {result: gameResult.ongoing, playerNumber: 1, gameBoard:Array.from({length: numOfColumns},()=> Array.from({length: numOfRows}, () => 0))});*/

    let playerName

    if(props.gameStatus.playerNumber === 2)
    {
        playerName = props.playerNames.Player2Name;
    }
    else{
        playerName = props.playerNames.Player1Name
    }

        return(
            <div>
                {(props.gameStatus.result !== gameResult.ongoing) && <EndGameScreen playerNames={props.playerNames}
                                                                                    gameStatus={props.gameStatus}
                                                                                    playerScores={props.playerScores}
                                                                                    playerColors={props.playerColors}
                                                                                    setPlayerColors={props.setPlayerColors}/>}
                <GameHeader playerName={playerName}/>
                <Board gameBoard={props.gameStatus.gameBoard}
                       playerColors={props.playerColors}
                       setPlayerColors={props.setPlayerColors}
                       gameStatus={props.gameStatus}
                       setGameStatus={props.setGameStatus}
                       playerScores={props.playerScores}
                       setPlayerScores={props.setPlayerScores}/>
                <GameFooter playerNames={props.playerNames}
                            playerScores={props.playerScores}/>
            </div>
        )
}

export default GameScreen