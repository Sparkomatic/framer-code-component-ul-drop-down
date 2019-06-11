import * as React from "react"
import { useState, useEffect } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import styled from "styled-components"

interface Props {
    width: number
    height: number
    backgroundColor: string
    myBorderRadius: number
    text: string
}

//for the border-radius to be dynamic you ahev to give the defaultProps the right name, e.g border-radius becomes // borderRadius in props. If you called it myBorderRadius in defaultProps it would not work. You can use your own defaultProperty names for you logic
const StyledDiv = styled.div`
//   padding: 1rem;
  border: 2px solid black;
  border-radius: ${props => props.myBorderRadius};
  text-align: right;
`

// here you can see how I use the spread operatorr to display a load of the default props but I can also conactanate other properties too
//furthermore I am using logic in the style too
export function Simple_code(props) {
    return (
        <StyledDiv
            style={...{
                ...props,
                color: "blue",
                background: props.text === "shit man" ? "green" : "yellow",
                textAlign: props.myLogicValue == 42 ? "right" : "left",
            }}
        >
            {props.text}
        </StyledDiv>
    )
}

//setting a property here that is also in the styled.div css will override the one in style.div if I am using ...props
Simple_code.defaultProps = {
    width: 100,
    height: 50,
    background: "red",
    text: "not shit man",
    borderRadius: 7,
    myLogicValue: 42,
}
