import React from "react"
import { colors } from "../../Constants";
import "../../styles/HomeScreen.css"

interface colorDetails{
    showColors: boolean
    setShowColors: React.Dispatch<React.SetStateAction<boolean>>
}

function ColorPicker(props:colorDetails){

    let colorArray = []

    function showColors(){
        props.setShowColors(prevVal => !prevVal);
    }

    if(props.showColors){
        for(let i = 0; i < colors.length; i++)
        {
            colorArray.push(<div className="colorElement" style={{backgroundColor:colors[i]}}></div>)
        }
    }

    return(
        <div className="colorContainer">
            {colorArray}
            <button onClick={showColors}></button>
        </div>
    )
}

export default ColorPicker