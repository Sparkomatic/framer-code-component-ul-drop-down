import * as React from "react"
import { useState, useEffect } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import styled from "styled-components"

interface Props {
    padding: number
    paddingLeft: number
    color: string
    listBackgroundColor: string
    icon: string
    iconColor: string
    iconSize: number
    iconTop: number
    bgColor: string
    backgroundImage: string
    width: number
    height: number
    listItemLineHeight: number
    listItemMarginTopBottom: number
    listItemHoverColor: string
    ddListExpandedHeight: number
    options: string[]
    placeholder: string
    borderColor: string
    radius: number
}

interface State {
    listOpen: boolean
}

const StyledDropdown = styled("div")`
    position: relative;
    /* height: auto; */
    height: 48px;
    min-height: 100% !important;
    display: flex;
    justify-content: left;
    /* border: solid 1px; */
    font-size: 16px;
    color: ${props => props.color};
    .dd-wrapper {
      width: 100%;
    }
    /* select {
      border: 1px solid #000;
    } */
    .dd-header {
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      /* border: 1px solid; */
      border: 1px solid ${props => props.borderColor};
      border-radius: ${props => props.radius}px;
      cursor: default;
      position: relative;
      background-color: white;
      height: 100%;
      padding: 0 16px;
      /* &:focus {
        outline: none;
        outline-color: #f0f;
      } */
    }
    .dd-header span {
      margin-right: 20px;
    }
    .dd-header-title {
      font-weight: 300;
    }
    .dd-list {
      z-index: 10;
      min-height: 100% !important;
      border-color: ${props => props.borderColor};
      border-width: 1px;
      border-style: ${props =>
          props.dropDownListHasBorder ? "solid" : "none"};
      border-top: none;
      -webkit-box-shadow: 0 2px 5px -1px #e8e8e8;
      box-shadow: 0 2px 5px -1px #e8e8e8;
      font-weight: 700;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      list-style: none;
      padding: 16px 0;
      margin: 0 auto;
      transition: height 0.4s ease;
      background-color: ${props => props.listBackgroundColor};
    }
    .dd-list-item {
      font-size: 16px;
      line-height: 24px;
      padding: 0 16px;
      margin: 8px auto;
      &:hover {
        background-color: ${props => props.listItemHoverColor};
      }
    }
  `

const StyledIcon = styled("div")`
    width: 20px;
    height: 20px;
    transition: 0.1s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  `

export function Ul_dropdown(props) {
    // private selectRef: React.RefObject<HTMLSelectElement>

    const [item, setItem] = useState(null)
    const [listOpen, setListOpen] = useState(false)

    useEffect(() => {
        return () => {
            console.log("cleanup")
        }
    }, [item])

    const handleToggleList = () => {
        listOpen === false ? setListOpen(true) : setListOpen(false)
    }

    // const handleSelectItem = item => {
    //     item == null ? setItem("place holder") : setItem(item)
    // }

    // getDdExpandedHeight = () => {
    //   return (
    //     (this.props.listItemLineHeight + this.props.listItemMarginTopBottom) *
    //       this.props.numberOfListItems +
    //     this.props.listItemMarginTopBottom
    //   );
    // };

    // selectItem = item => {
    //     if (this.state.item) {
    //         this.state.item = item
    //     } else {
    //         this.setState({ item: item })
    //     }
    // }

    // const dropDownHeightWhenExpanded =
    //     (this.props.listItemLineHeight +
    //         this.props.listItemMarginTopBottom) *
    //         this.props.options.length +
    //     this.props.listItemMarginTopBottom

    // console.log(
    //     "dropdown height when expanded is: ",
    //     dropDownHeightWhenExpanded
    // )

    return (
        <Frame size={"100%"}>
            <StyledDropdown {...props}>
                <div className="dd-wrapper">
                    <div className="dd-header" onClick={handleToggleList}>
                        <div className="dd-header-title">
                            {item ? item : props.placeholder}
                        </div>
                        <StyledIcon
                            style={{
                                backgroundImage:
                                    "url('data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22" +
                                    props.iconColor +
                                    "%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A')",
                                transform: listOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                            }}
                        />
                    </div>
                    {listOpen && (
                        <ul className="dd-list">
                            {props.options.map((item, index) => (
                                <li
                                    className="dd-list-item"
                                    key={index}
                                    // onClick={() => {
                                    //     setItem(item)
                                    //     handleToggleList
                                    // }}
                                    onClick={() => {
                                        handleToggleList()
                                        setItem(item)
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </StyledDropdown>
        </Frame>
    )
}

// Set default properties
Ul_dropdown.defaultProps = {
    // color: "blue",
    padding: 16,
    paddingLeft: 16,
    width: 220,
    height: 48,
    iconColor: "#dfdfdf",
    iconSize: 0.7,
    iconTop: 2,
    listItemLineHeight: 24,
    listItemMarginTopBottom: 8,
    listBackgroundColor: "yellow",
    radius: 8,
}

// Items shown in property panel
addPropertyControls(Ul_dropdown, {
    options: {
        type: ControlType.Array,
        title: "Add options here",
        propertyControl: { type: ControlType.String },
        defaultValue: ["a", "b", "c"],
    },
    placeholder: {
        type: ControlType.String,
        title: "Default Value",
        defaultValue: "Click Here",
    },
    color: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#212B38",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "#dfdfdf",
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        min: 0,
        max: 12,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon Color",
        defaultValue: "#dfdfdf",
    },
    dropDownListHasBorder: {
        type: ControlType.Boolean,
        title: "Drop Down List Border",
        defaultValue: false,
    },
    listBackgroundColor: {
        type: ControlType.Color,
        title: "List Background Color",
        defaultValue: "#fff",
    },
    listItemHoverColor: {
        type: ControlType.Color,
        title: "List Item Hover Color",
        defaultValue: "#dfdfdf",
    },
})
