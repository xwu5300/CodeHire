import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserNavBar from '../UserNavBar.jsx';
import PastChallengeView from './PastChallengeView.jsx';

class PastChallengeListView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // this.props.fetchCandidateResults(localStorage.getItem('userId'));
  }

  render() {
    // console.log('past challenge list view props', this.props)
    return(
      <div>
        <UserNavBar/>
        
        {this.props.candidate_results.length ? 
        <PastChallengeView challenges={this.props.candidate_results}/>
        : <div>You haven't Taken Any Challenges</div>
        }
        
      </div>
    )
  }
}

export default withRouter(PastChallengeListView);
