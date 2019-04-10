import * as React from "react";
import { PropertyControls, ControlType, Frame, animate, FramerAnimation, PropertyStore, RenderTarget } from "framer";
import { string, array } from "prop-types";
import styled from "styled-components";
import { JSONArray } from "framer/types/src/render/types/JSONData";
// import { State } from "framer/types/src/events/recognizer/GestureRecognizer";


// const StyledDropdown = styled.select`
// const StyledDropdown = styled("div")`

// const getDdExpandedHeight = () => {
//   return (((this.props.listItemLineHeight + this.props.listItemMarginTopBottom) * this.props.numberOfListItems) + this.props.listItemMarginTopBottom)
// }


interface Props {
  optionTitles: string;
  separator: string;
  optionTitleArray: string[];
  optionArray: JSONArray;
  text: string;
  padding: number;
  paddingLeft: number;
  color: string;
  icon: string;
  iconColor: string;
  iconSize: number;
  iconTop: number;
  bgColor: string;
  backgroundImage: string;
  width: number;
  height: number;
  listItemLineHeight: number;
  numberOfListItems: number;
  listItemMarginTopBottom: number;
  ddListExpandedHeight: number;
  // ddIconRotation: number;
}

interface State {
  listOpen: boolean,
  // option: JSONArray
}


export class ul_drop_down extends React.Component<Props, State> {
  private selectRef: React.RefObject<HTMLSelectElement>;


  // Set default properties
  static defaultProps = {
    title: 'Istanbul',
    optionTitles: "London, New York, Dublin",
    optionTitleArray: [],
    separator: ",",
    color: "blue",
    padding: 16,
    paddingLeft: 16,
    width: 220,
    height: 48,
    iconColor: "#dfdfdf",
    iconSize: 0.7,
    iconTop: 2,
    listItemLineHeight: 24,
    numberOfListItems: 7,
    listItemMarginTopBottom: 8,
    // ddListExpandedHeight: getDdExpandedHeight,
    // bgColor: "black",
    // selectedOption: location[0]
  };

	// Items shown in property panel
	static propertyControls: PropertyControls = {
		options: {
			type: ControlType.String,
			title: 'Options',
			defaultValue: 'London, New York, Dublin',
		},
	}

// optionTitleArray = this.props.optionTitles.split(this.props.separator);


  state = {
    listOpen: false,
    option: [
      {
        id: 0,
        title: 'London',
        selected: false,
        key: 'option'
      },
      {
          id: 1,
          title: 'New York',
          selected: false,
          key: 'option'
      },
      {
        id: 2,
        title: 'Dublin',
        selected: false,
        key: 'option'
      }
    ]
  }

  toggleList = () => {
    const listOpen = !this.state.listOpen
    this.setState({ ...this.state, listOpen })
  }

  getDdExpandedHeight = () => {
    return (((this.props.listItemLineHeight + this.props.listItemMarginTopBottom) * this.props.numberOfListItems) + this.props.listItemMarginTopBottom)
  }

  // multiSelectItem = (id, key) => {
  //   let temp = {};
  //   temp[key]= this.state[key].map(obj => {
  //     if(obj.id == id) {
  //       obj.selected = !obj.selected;
  //     }
  //     return obj;
  //   });

  //   this.setState(temp);
  // }


  selectItem = (id, key) => {
    let temp = {};
    temp[key] = this.state[key].map(obj => {
    obj.selected = obj.id == id;
      return obj;
    });
    this.setState(temp);
  }

  getSelectedItem = (key) => {
    let selected = this.state[key].filter(item => {
      return item.selected;
    });
    if(selected[0]) {
      return selected[0].title;
    }
    else {
      return "Choose..."
    }
  }

  StyledDropdown = styled("div")`
  position: relative;
  /* height: auto; */
  height: 48px;
  min-height: 100% !important;
  display: flex;
  /* align-items: center; */
  justify-content: left;
  border-radius: 2px;
  border: solid 1px #DEDEDE;
  color: #212b38;
  font-size: 16px;

  .dd-wrapper {
    width: 100%;
  }
  select {
    border: 1px solid #000;
  }
  .dd-header {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  border: 1px solid #dfdfdf;
  border-radius: 3px;
  cursor: default;
  position: relative;
  background-color: white;
  height: 100%;
  padding: 0 16px;
}
  .dd-header span {
  margin-right: 20px;
}
  .dd-header-title {
  font-weight: 300;
}
.dd-list {
  z-index: 10;
  /* height: auto; */
  height: ${props => (((props.listItemLineHeight + props.listItemMarginTopBottom) * props.numberOfListItems) + props.listItemMarginTopBottom)};
  min-height: 100% !important;
  border: 1px solid #dfdfdf;
  /* border-top: none; */
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 5px -1px #e8e8e8;
  box-shadow: 0 2px 5px -1px #e8e8e8;
  font-weight: 700;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  padding: 16px 0;
  margin: 0 auto;
  transition: height 0.4s ease;
}
  .dd-list-item {
    font-size: 16px;
    line-height: 24px;
    padding: 0 16px;
    margin: 8px auto;
    &:hover {
      background: #dfdfdf;
    }
  }
`;

StyledIcon = styled("div")`
width: 20px;
height: 20px;
transition: 0.1s;
background-position: center; 
background-repeat:no-repeat;
background-size: 100% 100%;
`

  render() {
    console.log("render called even when updating property controls in design screen");  
    const dropDownHeightWhenExpanded = (((this.props.listItemLineHeight + this.props.listItemMarginTopBottom) * this.props.numberOfListItems) + this.props.listItemMarginTopBottom);

    return (
      <this.StyledDropdown
        style={{
          width: this.props.width,
          
        }}
      >
        <div className="dd-wrapper">
          <div className="dd-header" onClick={() => this.toggleList()}>  
              <div className="dd-header-title" >{this.getSelectedItem('option')}

              </div>
              <this.StyledIcon
                style={{
                  backgroundImage: "url('data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22" + this.props.iconColor + "%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A')",
                  transform: this.state.listOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                >
                </this.StyledIcon>
          </div>
          {this.state.listOpen && 
          <ul className="dd-list"
          // style={{
          // visibility: this.state.listOpen ? "visible" : "hidden",
          // height: this.state.listOpen ? "300px" : "0px",      
          // }}
          >
          {this.state.option.map(item => (
            <li className="dd-list-item" key={item.title} onClick={() => {
              this.selectItem(item.id, item.key);
              this.toggleList();
          }}>
              {item.title}
            </li>
          ))}
        </ul>
        }
        </div>
      </this.StyledDropdown>
    );
  }
}
