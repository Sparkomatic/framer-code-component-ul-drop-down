import * as React from "react";
import { PropertyControls, ControlType, Frame, animate, FramerAnimation, PropertyStore, RenderTarget } from "framer";
import { string } from "prop-types";
import styled from "styled-components";
import { JSONArray } from "framer/types/src/render/types/JSONData";
// import { State } from "framer/types/src/events/recognizer/GestureRecognizer";


// const StyledDropdown = styled.select`
// const StyledDropdown = styled("div")`


interface Props {
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
  // ddIconRotation: number;
}

interface State {
  listOpen: boolean,
  location: JSONArray
}

export class ul_drop_down extends React.Component<Props, State> {
  private selectRef: React.RefObject<HTMLSelectElement>;


  // Set default properties
  static defaultProps = {
    // text: "Hello World!",
    color: "blue",
    padding: 16,
    paddingLeft: 16,
    width: 220,
    height: 48,
    iconColor: "red",
    iconSize: 0.7,
    iconTop: 2,
    bgColor: "black",
    // selectedOption: location[0]
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: "Text" }
  };


  state = {
    listOpen: false,
    location: [
      {
        id: 0,
        title: 'London',
        selected: false,
        key: 'location'
      },
      {
          id: 1,
          title: 'New York',
          selected: false,
          key: 'location'
      },
      {
        id: 2,
        title: 'Dublin',
        selected: false,
        key: 'location'
      },
      {
        id: 3,
        title: 'California',
        selected: false,
        key: 'location'
      },
      {
        id: 4,
        title: 'Istanbul',
        selected: false,
        key: 'location'
      },
      {
        id: 5,
        title: 'Izmir',
        selected: false,
        key: 'location'
      },
      {
        id: 6,
        title: 'Oslo',
        selected: false,
        key: 'location'
      }
    ]
  }

  toggleList = () => {
    const listOpen = !this.state.listOpen
    this.setState({ ...this.state, listOpen })
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
  background-color: purple;
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
  background-color: yellow;
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
  height: auto;
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
  padding: 16px;
  margin: 0 auto;
}
  .dd-list-item {
    font-size: 16px;
    line-height: 24px;
    margin: 8px auto;
    &:hover {
      background: blue;
    }
  }
`;

StyledIcon = styled("div")`
width: 20px;
height: 20px;
transition: 0.2s;
background-position: center; 
background-repeat:no-repeat;
background-size: 100% 100%;
`

  render() {

    return (
      <this.StyledDropdown
        style={{
          width: this.props.width,
        }}
      >
        <div className="dd-wrapper">
          <div className="dd-header" onClick={() => this.toggleList()}>  
              <div className="dd-header-title" >{this.getSelectedItem('location')}

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
          <ul className="dd-list">
          {this.state.location.map(item => (
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
