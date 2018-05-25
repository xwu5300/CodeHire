import React, { Component } from 'react';


class SavedUsers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      {this.props.favorites.length === 0 ? null : this.props.favorites.map((user, i) => {
        return(
          <div className="ui segment" key={i}>
          {user.profile_photo ?
            <img src={user.profile_photo} className="ui small left floated image" style={{width: '100px'}}/> : <img src="profilePic.jpg"  style={{width: '100px'}} className="ui small left floated image"/> }
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github:  {user.github_url ? user.github_url : 'None added'}</div>
            <div>Resume: {user.resume_url ? <a href={user.resume_url} target="_blank">{user.resume_name}</a>: 'None added'}</div>
            <br/>
            <i className={user.contacted ? "envelope open icon cursor" : "envelope open outline icon cursor"} onClick={()=>{this.props.contact(user.id, localStorage.getItem('userId'), user.contacted)}}></i>
            <i className="heart icon search cursor" onClick={()=>this.props.remove(localStorage.getItem('userId'), user.user_id)}></i>
          </div>
        )
      })}
      </div>
    )
  }
}

export default SavedUsers;