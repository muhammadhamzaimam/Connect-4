import React, {useState} from "react"
import "../../styles/HomeScreen.css"
import { GithubPicker } from "react-color";

interface colorDetails{
    showColors: boolean
    setShowColors: React.Dispatch<React.SetStateAction<boolean>>
    colorSelected: boolean
    setColorSelected: React.Dispatch<React.SetStateAction<boolean>>
}

function ColorPicker(props:colorDetails){

    const[buttonColor, setButtonColor] = useState("#FFFFFF")

    let colorArray = []

    function showColors(){
        props.setShowColors(prevVal => !prevVal);
    }

    function handleColorSelection(color:any){
        props.setColorSelected(true);
        setButtonColor((color.hex));
        props.setShowColors( prevVal => !prevVal)
    }

    if(props.showColors){
        colorArray.push(<GithubPicker onChange={handleColorSelection}></GithubPicker>)
    }

    return(
        <div className="colorContainer">
            {colorArray}
            <button onClick={showColors} style={{backgroundColor:buttonColor}}></button>
        </div>
    )
}

export default ColorPicker