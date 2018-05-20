import React, { Component } from 'react';


class UserSearchResults extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div>
        {this.props.users.length === 0 && this.props.searched === true ? <div>No results found. Please search again.</div> : this.props.users.map((user) => {
          return(
          <div>
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github:  {user.github_url ? user.github_url : 'None added'}</div>
            Resume: <a href={user.resume_url} target="_blank">{user.resume_name ? user.resume_name : 'None added'}</a>
            <br/>
            <button className="ui button" onClick={()=>{this.props.save(localStorage.getItem('userId'), user.id)}}>Save</button>
          </div>
          )
        })}
      </div>
    )
  }
}



export default UserSearchResults;