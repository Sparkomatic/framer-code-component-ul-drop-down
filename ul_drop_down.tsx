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
    // bgColor: "#FFF",
    bgColor: "yellow",
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
      return "Choose something"
    }
  }

  StyledDropdown = styled("div")`
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: auto;
  min-height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 2px;
  border: solid 1px #DEDEDE;
  padding-left: 1rem;
  color: #212b38;
  background-repeat: no-repeat, repeat;
  /* margin: 20px 10px; */
  font-size: 16px;
  select {
    border: 1px solid #000;
  }
  .dd-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  line-height: 38px;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  cursor: default;
  position: relative;
  background-color: #fff;
}
  .dd-header span {
  margin-right: 20px;
}
  .dd-header-title {
  font-weight: 300;
  margin: 2px 20px;
  /* margin-right: 30px; */
  margin-right: 8px;
}
.dd-list {
  z-index: 10;
  position: absolute;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 5px -1px #e8e8e8;
          box-shadow: 0 2px 5px -1px #e8e8e8;
  font-weight: 700;
  padding: 15px 0;
  max-height: 215px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
  .dd-list-item {
    font-size: 16px;
    &:hover {
      background: blue;
    }
  }
`;

  render() {

    return (
      <this.StyledDropdown
        style={{
          backgroundColor: this.props.bgColor,
          backgroundImage: "url('data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22" + this.props.iconColor + "%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A'), linear-gradient(to bottom, " + this.props.bgColor + " 0%, " + this.props.bgColor + " 100%)",
          backgroundPosition: "right calc(" + this.props.padding + "px + " + this.props.iconSize * .3 + "em) top " + this.props.height/2 + "px, 0 0",
          backgroundSize: this.props.iconSize + "em auto, 100%",
        }}
      >
        <div className="dd-wrapper">
          <div className="dd-header" onClick={() => this.toggleList()}>  
              <div className="dd-header-title" >{this.getSelectedItem('location')}
              <div className="dd-icon">
              </div>
              </div>
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

