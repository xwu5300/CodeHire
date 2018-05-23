import React, { Component } from 'react';
import moment from 'moment';
import PastResults from './PastResults.jsx';


class PastChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: this.props.pastChallenges.map((item) => false)
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i, id) {
    let newShowList = [...this.state.showList];
    newShowList[i] = !this.state.showList[i];
    this.setState({
      showList: newShowList
    }, () => {
      this.props.fetchPastResults(id);
    })
  }

  render() {
    return(
      <div className="past-challenge-container">
      {this.props.pastChallenges.length === 0 ? null : this.props.pastChallenges.map((challenge, i) => {
        return (
          <div key={challenge.id}>
            <div>{challenge.title}</div>
            <div>{moment(challenge.time).format('MMMM Do YYYY, h:mm A')}</div>
            <button className="ui button" onClick={()=>{this.handleClick(i, challenge.id)}}>{this.state.showList[i] ? "Hide Results" : "See Results"}</button>
            {this.state.showList[i] && this.props.pastResults.length > 0 ? <PastResults save={this.props.save} pastResults={this.props.pastResults}/> : null}
          </div>
        )
      })}
      </div>
    )
  }
}



export default PastChallenges;