import React, { Component } from 'react';


class UserSearchResults extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div>
        {this.props.users.length === 0 ? null : this.props.users.map((user) => {
          return(
          <div>
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills}</div>
            <div>Info: {user.information} </div>
            <div>Github: {user.github_url}</div>
            <button className="ui button" onClick={()=>{this.props.save(localStorage.getItem('userId'), user.id)}}>Save</button>
          </div>
          )
        })}
      </div>
    )
  }
}



export default UserSearchResults;