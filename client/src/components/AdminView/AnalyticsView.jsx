import React, { Component } from 'react';
import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import AllChallengeResults from './AnalyticsView/AllChallengeResults.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
  }

  render() {
    return (
      <div>
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
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
          <button onClick={()=>{this.setState({show: !this.state.show})}}>Show Graph</button>
            {this.state.show ? <AllChallengeResults getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/> : null}
          </div>
      </div>
    )
  }
}

export default AnalyticsView;
