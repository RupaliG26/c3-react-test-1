import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import PearsonUsersName from "./PearsonUsersName";

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);
    /* Start : State object defining the initial set of users */
    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      result: []
    };
    /* End : State object defining the initial set of users */
  }
  componentWillMount() {
    /* Start : Fetch the users from the api */
    return fetch('https://reqres.in/api/users?page=1&per_page=10').then( (response) => {
      return response.json() }) /* End : Fetch the users from the api */   
      .then( (json) => {
        for(let newUser in json.data) {
          this.state.users.push(json.data[newUser]); // Push the new users fetched from api call into the existing users 
        }
        this.setState({users: this.state.users}, () => {
          this._removeDuplicates(this); //remove duplicate users from the state object
        });
      });
  }
  _removeDuplicates() {
    this.state.users.sort(function(prev, next) {
      return (prev.id > next.id) ? 1 : ((next.id > prev.id) ? -1 : 0);
    }); // Sort the users present in the state object in ascending order of their ID's
    /* Start : Compare the users with the same ID, delete the duplicate entry found and store the result in the array */
    this.state.result = (this.state.users).reduce((accumulator, current) => {
      const length = accumulator.length;
      if (length === 0 || accumulator[length - 1].id !== current.id) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    /* End : Compare the users with the same ID, delete the duplicate entry found and store the result in the array */
    this.setState({users: this.state.result}); // Update the state object with the new set of users (without duplicate entries)
    return this.state.result;
  }
  /* Start : Delete the user on click of 'Delete' button */
  _deleteUser(items) {
    let filteredArray = this.state.result.filter(item => item.id !== items.id);
    this.setState({result: filteredArray});
  }
  /* End : Delete the user on click of 'Delete' button */
  render() {
    return (
      <div className="pearson-users">
        <h1>Pearson User Management</h1>
        <div className="pearson-data">
           {this.state.result.map( (item, i) => { // Map the array of objects with the <PearsonUsersName>
             return <PearsonUsersName keyVal={item.id} key={i} first={item.first_name} last={item.last_name} 
             pic={item.avatar} delUser={this._deleteUser.bind(this,item)}  />
           })}
        </div>
      </div>
    );
  }
}
