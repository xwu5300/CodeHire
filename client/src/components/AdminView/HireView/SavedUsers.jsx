import React, { Component } from 'react';


class SavedUsers extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <div>
      {this.props.favorites.length === 0 ? null : this.props.favorites.map((user) => {
        return(
          <div className="ui segment">
          {user.profile_photo ?
            <img src={user.profile_photo} className="ui small left floated image" style={{width: '100px'}}/> : <img src="profilePic.jpg"  style={{width: '100px'}} className="ui small left floated image"/> }
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github:  {user.github_url ? user.github_url : 'None added'}</div>
            Resume: <a href={user.resume_url} target="_blank">{user.resume_name ? user.resume_name : 'None added'}</a>
            <br/>
            <button className="ui button" onClick={()=>this.props.remove(localStorage.getItem('userId'), user.id)}>Unsave</button>
            <button className="ui button">Contact</button>
          </div>
        )
      })}
      </div>
    )
  }
}

export default SavedUsers;