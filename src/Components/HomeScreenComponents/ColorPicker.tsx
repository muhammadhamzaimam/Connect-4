import React from "react"
import "../HomeScreen.css"
import { GithubPicker } from "react-color";
import {colors} from "../../Constants"

interface ColorDetails{
    showColors: boolean
    setShowColors: React.Dispatch<React.SetStateAction<boolean>>
    colorSelected: boolean
    setColorSelected: React.Dispatch<React.SetStateAction<boolean>>
    playerColor: string
    setPlayerColor: (playerColor:string) => void
}

function ColorPicker(props:ColorDetails){
    let colorArray = []

    let colorPickerWidth = "125px";

    function showColors(){
        props.setShowColors(prevVal => !prevVal);
    }

    function handleColorSelection(color:any){
        props.setColorSelected(true);
        props.setPlayerColor(color.hex);
        props.setShowColors( prevVal => !prevVal)
    }

    if(props.showColors){
        colorArray.push(<GithubPicker onChange={handleColorSelection}
                                      colors={colors}
                                      width={colorPickerWidth}></GithubPicker>)
    }

    return(
        <div className="colorContainer">
            <button className="color-select-button"
                    onClick={showColors}
                    style={{backgroundColor:props.playerColor}}></button>
            {colorArray}
        </div>
    )
}

export default ColorPicker