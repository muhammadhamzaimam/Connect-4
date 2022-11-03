import React, {useState} from "react"
import ColorPicker from "./ColorPicker"
import "../../styles/HomeScreen.css";

interface playerInfo{
    playerNumber: number,
    inputHandler: (playerName:string) => void,
    PlayerName:string
    setPlayerColor: (playerColor:string) => void
}

function PlayerDetails({playerNumber, inputHandler, PlayerName, setPlayerColor}: playerInfo) {

    /*On button click of color button, you want to add the component ColorPicker to the div of ID colorPicker*/

    const[colorButtonIsActive, setColorButtonActive] = useState(false);
    const[colorSelected, setColorSelected] = useState(false);


    return (
        <div className="playerDetailsContainer">
            <div className="playerDetails">
                <label htmlFor="playerName" className="playerName">Player {playerNumber}: </label>
                <input type="text" id="playerName" placeholder="Name" onChange={event => inputHandler(event.target.value)} value={PlayerName}/>
            </div>
            <div className="colorPicker">
                <ColorPicker showColors={colorButtonIsActive} setShowColors={setColorButtonActive} colorSelected={colorSelected} setColorSelected={setColorSelected}
                             setPlayerColor={setPlayerColor}></ColorPicker>
            </div>
        </div>
    )
}

export default PlayerDetails