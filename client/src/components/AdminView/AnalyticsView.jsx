import React, { Component } from 'react';
import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import BarGraph from './AnalyticsView/BarGraph.jsx';
import LineGraph from './AnalyticsView/LineGraph.jsx';
import Scatterplot from './AnalyticsView/Scatterplot.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
  }

  render() {
    console.log('do i have all challenges for a company??', this.props)
    return (
      <div>
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <BarGraph companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challenges={this.props.all_challenges} challengeData={this.props.challenge_data}/>
        <LineGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
        <Scatterplot companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challengeData={this.props.challenge_data}/>
      </div>
    )
  }
}

export default AnalyticsView;
