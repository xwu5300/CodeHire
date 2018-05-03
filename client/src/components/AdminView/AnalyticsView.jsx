import React, { Component } from 'react';
import { connect } from "react-redux";

class AnalyticsView extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='analytics_container'>
        <h1>Analytics</h1>
      </div>
    )
  }
}

// const Analytics = connect(null, mapDispatchToProps)(Analytics);

export default AnalyticsView;