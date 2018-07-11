import React, { Component } from "react";
export default class PearsonUsersName extends Component {
  render() {
    return (
      /* Start : Render the elements present inside the component */
        <div id={this.props.keyVal} className="pearson-box">
          <img src={this.props.pic} alt="Pic" />
          <div className="user-name">{this.props.first} {this.props.last}</div>
          <a href="javascript:void(0)" onClick={this.props.delUser} className="delete-user">Delete</a>
        </div>
      /* End : Render the elements present inside the component */
    );
  }
}
