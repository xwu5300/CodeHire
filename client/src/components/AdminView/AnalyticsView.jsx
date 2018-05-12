import React, { Component } from 'react';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
  } 

  render() {
    return (
      <div>
        <div className="ui orange four item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui item' onClick={() => this.props.history.push('/admin/challenges') }>Edit Challenges</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
        </div>

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