import React, { Component } from 'react';
import { connect } from "react-redux";

class ChallengeListView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className='challenge_list_container'>
        <h1>Challenges</h1>
        <ul>
          <li> Challenge 1 </li>
          <li> Challenge 2 </li>
          <li> Challenge 1 </li>
          <li> Challenge 2 </li>
          <li> Challenge 1 </li>
          <li> Challenge 2 </li>
          <li> Challenge 1 </li>
          <li> Challenge 2 </li>
        </ul>
      </div>
    )
  }
}

export default ChallengeListView;