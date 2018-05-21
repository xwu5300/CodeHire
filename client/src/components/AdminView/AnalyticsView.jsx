import React, { Component } from 'react';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import AllChallengeResults from './AnalyticsView/AllChallengeResults.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
  }

  render() {
    return (
      <div>
        <div className="ui orange five item menu">
          <div className='ui item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div>
          <div className='ui item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui active item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div>
        </div>

        <h1>Analytics</h1>
        <h2>Candidate List</h2>
          {this.props.candidate_list.length > 0 ? this.props.candidate_list.map((candidate, i) => {
            return (
              <div key={i}>Name: {candidate.name}
              <button onClick={() => {
                this.props.fetchCompanyResults(localStorage.getItem('userId'), candidate.id)
                this.props.history.push('/admin/data/results')
              }}>View Candidate Details
              </button>
              </div>
            )
          }) : null}
          <div>
            <AllChallengeResults getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
          </div>
      </div>
    )
  }
}

export default AnalyticsView;
