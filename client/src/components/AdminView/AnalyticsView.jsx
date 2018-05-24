import React, { Component } from 'react';
import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import BarGraph from './AnalyticsView/BarGraph.jsx';
import LineGraph from './AnalyticsView/LineGraph.jsx';
import Scatterplot from './AnalyticsView/Scatterplot.jsx';
import PastResults from './AnalyticsView/PastResults.jsx';
import PastChallenges from './AnalyticsView/PastChallenges.jsx';


class AnalyticsView extends Component {
  constructor() {
    super();
    this.state = {
      currentGraph: 'past results',
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeGraph = this.changeGraph.bind(this)
    this.renderGraph = this.renderGraph.bind(this)
  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
    this.props.fetchPastSchedule(localStorage.getItem('userId'));
  }

  handleClick(graph) {
    this.changeGraph(graph)
  }

  changeGraph(option) {
    this.setState({
      currentGraph: option
    }, ()=> console.log(this.state.currentGraph))
  }

  renderGraph() {
    const {currentGraph} = this.state

    if (currentGraph === 'bar') {
      return <BarGraph companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challenges={this.props.all_challenges} challengeData={this.props.challenge_data}/>
    } else if (currentGraph === 'line') {
      return <LineGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
    } else if (currentGraph === 'scatter') {
      return <Scatterplot companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challengeData={this.props.challenge_data}/>
    } else if (currentGraph === 'past results') {
      return <PastChallenges fetchCandidateResults={this.props.fetchCandidateResults} candidateResults={this.props.candidate_results} favorites={this.props.favorites} remove={this.props.removeFromFavorites} getFavorites={this.props.getFavorites} history={this.props.history} save={this.props.saveToFavorites} pastResults={this.props.past_results} pastChallenges={this.props.past_challenges} fetchPastResults={this.props.fetchPastResults}/>
    }
  }

  render() {
    return (
      <div>
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout }/>
        <div className="analytics-container">
          <div className="ui orange four item menu">
            <div className={this.state.currentGraph === 'past results' ? 'ui active item cursor bold' : "ui item cursor"} onClick={() => this.handleClick('past results') }>Past Challenges</div>
            <div className={this.state.currentGraph === 'bar' ? 'ui active item cursor bold' : "ui item cursor"} onClick={() => this.handleClick('bar') }>Bar</div>
            <div className={this.state.currentGraph === 'line' ? 'ui active item cursor bold' : "ui item cursor"} onClick={() => this.handleClick('line') }>Line</div>
            <div className={this.state.currentGraph === 'scatter' ? 'ui active item cursor bold' : "ui item cursor"} onClick={() => this.handleClick('scatter') }>Scatterplot</div>
          </div>
          <div>
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default AnalyticsView;
