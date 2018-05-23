import React, { Component } from 'react';


class UserSearchResults extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return(
      <div>
        {this.props.users.length === 0 ? <div>No results found. Please search again.</div> : this.props.users.map((user, i) => {
          return(
          <div className="ui segment">
            {user.profile_photo ?
            <img src={user.profile_photo} className="ui small left floated image" style={{width: '100px'}}/> : <img src="profilePic.jpg" style={{width: '100px'}} className="ui small left floated image"/> }
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github:  {user.github_url ? user.github_url : 'None added'}</div>
            <div>Resume: {user.resume_url ? <a href={user.resume_url} target="_blank">{user.resume_name}</a>: 'None added'}</div>
            <br/>
            <i className={!this.props.favorites.includes(user.id) ? "heart outline icon search cursor" : "heart icon search cursor"} 
            onClick={!this.props.favorites.includes(user.id) ? ()=>{this.props.save(localStorage.getItem('userId'), user.id)} : ()=>this.props.remove(localStorage.getItem('userId'), user.id)}></i>
          </div>
          )
        })}
      </div>
    )
  }
}



export default UserSearchResults;