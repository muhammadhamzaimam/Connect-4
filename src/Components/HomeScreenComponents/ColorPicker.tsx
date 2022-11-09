import React, {useState} from "react"
import "../HomeScreen.css"
import { GithubPicker } from "react-color";

interface colorDetails{
    showColors: boolean
    setShowColors: React.Dispatch<React.SetStateAction<boolean>>
    colorSelected: boolean
    setColorSelected: React.Dispatch<React.SetStateAction<boolean>>
    setPlayerColor: (playerColor:string) => void
}

function ColorPicker(props:colorDetails){

    const[buttonColor, setButtonColor] = useState("#FFFFFF")

    let colorArray = []

    function showColors(){
        props.setShowColors(prevVal => !prevVal);
    }

    function handleColorSelection(color:any){
        props.setColorSelected(true);
        props.setPlayerColor(color.hex);
        setButtonColor((color.hex));
        props.setShowColors( prevVal => !prevVal)
    }

    if(props.showColors){
        colorArray.push(<GithubPicker onChange={handleColorSelection}></GithubPicker>)
    }

    return(
        <div className="colorContainer">
            <button className="color-select-button" onClick={showColors} style={{backgroundColor:buttonColor}}></button>
            {colorArray}
        </div>
    )
}

export default ColorPicker