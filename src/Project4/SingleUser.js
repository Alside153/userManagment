import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import utils from "./utils";
import "./SingleUser.css";

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      postsUrl: "https://jsonplaceholder.typicode.com/posts",
      usersUrl: "https://jsonplaceholder.typicode.com/users",
      todosUrl: "https://jsonplaceholder.typicode.com/todos",
      posts: [],
      todos: [],
      isCompleted: true,
      OtherDataOpen: false,
      isClicked: false,
    };
  }

  async componentDidMount() {
    let tempTodos = await utils.getAll(this.state.todosUrl);
    await this.setState({
      todos: tempTodos.data,
    });
    let tempUserTodos = tempTodos.data.filter(
      (todo) => todo.userId === this.state.user.id
    );
    tempUserTodos.forEach((todo) => {
      if (!todo.completed) this.setState({ isCompleted: false });
    });
  }

  async componentDidUpdate() {
    if (this.props.location.state.isClosing !== undefined)
      if (this.state.isClicked === this.props.location.state.isClosing)
        await this.setState({ isClicked: false });
  }

  NameChange = (e) => {
    let tempUser = this.state.user;
    tempUser.name = e.target.value;
    this.setState({ user: tempUser });
  };

  EmailChange = (e) => {
    let tempUser = this.state.user;
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };
  streetChange = (e) => {
    let tempUser = this.state.user;
    tempUser.address.street = e.target.value;
    this.setState({ user: tempUser });
  };
  cityChange = (e) => {
    let tempUser = this.state.user;
    tempUser.address.city = e.target.value;
    this.setState({ user: tempUser });
  };
  zipCodeChange = (e) => {
    let tempUser = this.state.user;
    tempUser.address.zipcode = e.target.value;
    this.setState({ user: tempUser });
  };

  updateUser = async () => {
    await utils.updateUser(
      "https://jsonplaceholder.typicode.com/posts",
      this.state.user.id,
      this.state.user
    );
  };

  deleteUser = async () => {
    await utils.removeUser(
      "https://jsonplaceholder.typicode.com/posts",
      this.state.user.id
    );
  };

  render() {
    let colorCompleted;
    if (this.state.isCompleted) colorCompleted = "isGreen";
    else colorCompleted = "isRed";

    let closeOtherData;
    if (this.state.OtherDataOpen) closeOtherData = "isVis";
    else closeOtherData = "isNotVis";

    let coloredRedBackGround;
    if (this.state.isClicked) {
      coloredRedBackGround = "backColoredRed";
    } else {
      coloredRedBackGround = "backNotRed";
    }

    return (
      <div>
        <div
          className={`StudentDiv ${coloredRedBackGround}`}
          id={colorCompleted}
        >
          <div
            onClick={() => {
              this.setState({ isClicked: true });
              this.props.history.push("/todosposts", {
                id: this.state.user.id,
              });
            }}
          >
            ID: {this.state.user.id}
          </div>
          <br />
          Name:{" "}
          <input
            type="text"
            value={this.state.user.name}
            onChange={this.NameChange}
          />
          <br />
          Email:{" "}
          <input
            type="email"
            value={this.state.user.email}
            onChange={this.EmailChange}
          />
          <br />
          <div
            id="OtherDataDiv"
            onClick={async () => {
              await this.setState({ OtherDataOpen: !this.state.OtherDataOpen });
            }}
          >
            Other Data
          </div>
          <br />
          <div id="OtherDataDataDiv" className={closeOtherData}>
            Street:{" "}
            <input
              type="text"
              value={this.state.user.address.street}
              onChange={this.streetChange}
            />
            <br />
            City:{" "}
            <input
              type="text"
              value={this.state.user.address.city}
              onChange={this.cityChange}
            />
            <br />
            Zip Code:{" "}
            <input
              type="text"
              value={this.state.user.address.zipcode}
              onChange={this.zipCodeChange}
            />
            <br />
          </div>
          <div align="right">
            <br />
            <input type="button" value="Update" onClick={this.updateUser} />
            &nbsp;&nbsp;
            <input type="button" value="Delete" onClick={this.deleteUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleUser);
