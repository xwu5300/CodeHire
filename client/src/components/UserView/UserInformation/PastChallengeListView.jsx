import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        <div className="ui orange four item menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
        
        {this.props.candidate_results.length ? 
        <PastChallengeView challenges={this.props.candidate_results}/>
        : <div>You haven't Taken Any Challenges</div>
        }
        
      </div>
    )
  }
}

export default withRouter(PastChallengeListView);
