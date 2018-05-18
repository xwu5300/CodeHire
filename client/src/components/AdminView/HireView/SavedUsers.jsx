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
          <div>
            <div>Username: {user.username}</div>
            <div>Github: {user.github_url}</div>
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