import React, { Component } from 'react';
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryTheme, VictoryLine } from 'victory';


class AllChallengeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.getSuccessRate = this.getSuccessRate.bind(this);
  }

  getSuccessRate(results) {
    let data = {};
    let successRate = {};
    let temp = {};

    for (let key of results) {
      data[key.company_schedule_id] ? data[key.company_schedule_id]++ : data[key.company_schedule_id] = 1;
      if (key.user_passed === true) {
        temp[key.company_schedule_id] ? temp[key.company_schedule_id]++ : temp[key.company_schedule_id] = 1;
      }
    }
    for (let key in data) {
      successRate[key] = temp[key] / data[key];
    }

    return successRate;
  }

  render() {
    let successRate = this.getSuccessRate(this.props.companyResults);

    let companyData = this.props.companyResults.map((data) => {
      return {x: data.time, y: Math.round(successRate[data.company_schedule_id] * 100, 2)}
      }).sort((a, b) => {
        return a.time - b.time;
      })

    let filtered = companyData.filter((item) => {
      return !this[item.x] ? this[item.x] = true : false;
    }, {})

    return (
      <VictoryChart>
        <VictoryLine
        data={companyData} 
        style={{data: {stroke: '#FF00FF', strokeWidth: 1}}}
        
        />

        <VictoryLabel
        text={`Average Pass Rate`}
        verticalAnchor={"end"}
        x={140}
        y={30}
        />
      </VictoryChart>
    )
  }
}





export default AllChallengeResults;