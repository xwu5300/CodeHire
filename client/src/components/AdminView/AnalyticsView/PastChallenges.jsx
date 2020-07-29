import React, { Component } from 'react';
import moment from 'moment';
import PastResults from './PastResults.jsx';


class PastChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMainTable: true
    }
    this.showTable = this.showTable.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getFavorites(localStorage.getItem('userId'));
  }

  showTable() {
    this.setState({
      showMainTable: !this.state.showMainTable
    })
  }

  handleClick(id) {
    this.props.fetchPastResults(id, this.showTable);
  }

  render() {
    return(
      <div>
      {this.state.showMainTable ?  
      <div className="past-challenge-container">
        <table className="ui celled table">
        <thead>
          <tr>
            <th>Challenge</th>
            <th>Date</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
        {this.props.pastChallenges.length === 0 ?
          <tr>
            <td>You can see past challenge results once a scheduled challenge is completed.</td>
          </tr>
          : this.props.pastChallenges.map((challenge, i) => {
          return (
            <tr key={challenge.id}>
              <td>{challenge.title}</td>
              <td>{moment(challenge.time).format('MMMM Do YYYY, h:mm A')}</td>
              <td><button className="ui orange button" onClick={()=>{this.handleClick(challenge.id)}}>See Results</button></td>
            </tr>
          )
        })}
        </tbody>
        </table>
      </div> : <PastResults fetchCandidateResults={this.props.fetchCandidateResults} candidateResults={this.props.candidateResults} remove={this.props.remove} favorites={this.props.favorites.map((item) => item.user_id)} pastResults={this.props.pastResults} save={this.props.save} showTable={this.showTable}/>}
    </div>
    )
  }
}



export default PastChallenges;