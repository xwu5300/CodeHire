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
          </div>
          )
        })}
      </div>
    )
  }
}



export default UserSearchResults;