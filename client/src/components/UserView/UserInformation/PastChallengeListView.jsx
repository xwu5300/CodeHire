import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import PastChallengeTableView from './PastChallengeTableView.jsx';
import UserChallenge from './UserChallenge.jsx';

class PastChallengeListView extends Component {
  constructor() {
    super();
    this.isInitial = this.isInitial.bind(this);
    this.isPassed = this.isPassed.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidateResults(localStorage.getItem('userId'));
  }
    
  isPassed(userPassed) {
    return userPassed ? 'Passed' : 'Failed';
  }

  isInitial(initial) {
    return initial ? 'Initial Challenge' : ''
  }

  render() {
    console.log('USER HISTORY',this.props)
    if (this.props.candidate_results.length) {
      let rows = this.props.candidate_results.map((result) => ({
        challenge: {
          name: result.name, 
          title: result.title, 
          difficulty: result.difficulty,
          isPassed: this.isPassed(result.user_passed),
          score: result.score,
          instruction: result.instruction,
          completedAt: moment(result.completed_at).format('MMMM Do YYYY dddd, h:mm A'),
          code: result.code
        }
      }))

      let columns = [{accessor: 'challenge', CustomComponent: UserChallenge}]
      return (
        <div>
        <PastChallengeTableView rows={rows} columns={columns}/>
        </div>
      )
    } else {
      return (
        <div>
        <div>You haven't Taken Any Challenges</div>
        </div>
      )
    }

  }
}

export default withRouter(PastChallengeListView);
