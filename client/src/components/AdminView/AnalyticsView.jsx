import React, { Component } from 'react';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
  } 

  render() {
    console.log('ana view', this.props)
    return (
      <div className='analytics_container'>
        <h1>Analytics</h1>
        <h2>Candidate List</h2>
          {this.props.candidate_list.map((candidate, i) => {
            return (
              <div key={i}>Name: {candidate.name}
              <button onClick={() => {
                this.props.fetchCompanyResults(2, candidate.id)
                this.props.history.push('/admin/data/results')
              }}>View Candidate Details
              </button>
              </div>
            )
          })}
      </div>
    )
  }
}

export default AnalyticsView;