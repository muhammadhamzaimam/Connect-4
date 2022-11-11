import React, {useState} from "react"
import ColorPicker from "./ColorPicker"
import "../HomeScreen.css";

interface playerInfo{
    playerNumber: number,
    inputHandler: (playerName:string) => void,
    PlayerName:string
    playerColor: string
    setPlayerColor: (playerColor:string) => void
}

function PlayerDetails({playerNumber, inputHandler, PlayerName, setPlayerColor, playerColor}: playerInfo) {

    const[colorButtonIsActive, setColorButtonActive] = useState(false);
    const[colorSelected, setColorSelected] = useState(false);

    return (
        <div className="playerDetailsContainer">
            <div className="playerDetails">
                <label htmlFor="playerName"
                       className="playerName">Player {playerNumber}: </label>
                <input type="text"
                       id={`player-${playerNumber}-name`}
                       placeholder="Name"
                       onChange={event => inputHandler(event.target.value)}
                       value={PlayerName}/>
            </div>
            <div className="colorPicker">
                <ColorPicker showColors={colorButtonIsActive}
                             setShowColors={setColorButtonActive}
                             colorSelected={colorSelected}
                             setColorSelected={setColorSelected}
                             setPlayerColor={setPlayerColor}
                             playerColor={playerColor}></ColorPicker>
            </div>
        </div>
    )
}

export default PlayerDetails