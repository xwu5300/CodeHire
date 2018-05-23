import React, { Component } from 'react';

class PastResults extends Component {



  render() {
    return (
      <div>
      {this.props.pastResults.map((item) => {
        return (
          <div key={item.candidate_id}>
            <div>{item.username}</div>
            <div>{item.user_passed ? "Passed" : "Failed"}</div>
            <button onClick={()=>{this.props.save(localStorage.getItem('userId'), item.candidate_id)}}>Save to Favorites</button>
          </div>
        )
      })}
      </div>
    )
  }
}


export default PastResults;