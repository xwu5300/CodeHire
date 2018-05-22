import React, { Component } from 'react';
import { VictoryChart, VictoryLabel, VictoryGroup,VictoryAxis, VictoryTheme, VictoryLine } from 'victory';
import moment from 'moment';

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

    let otherCompanyResults = this.props.allResults.filter((result) => {
      return result.company_id !== this.props.companyResults[0].company_id;
    })

    let successRate = this.getSuccessRate(this.props.companyResults);
    let allCompanySuccessRate = this.getSuccessRate(otherCompanyResults); //gets success rate for all companies other than your own


    let companyData = this.props.companyResults.map((data) => {
      return {x: data.time, y: Math.round(successRate[data.company_schedule_id] * 100, 2)}
      }).sort((a, b) => {
        return Date.parse(a.x) - Date.parse(b.x);
      })

    let filteredCompanyData = companyData.filter((item) => {
      return !this[item.x] ? this[item.x] = true : false;
    }, {})

    let allCompanyData = otherCompanyResults.map((data) => {
      return {x: data.time, y: Math.round(allCompanySuccessRate[data.company_schedule_id] * 100, 2)}
    }).sort((a, b) => {
      return Date.parse(a.x) - Date.parse(b.x);
    })

    let obj = {}

    let filteredAllCompanyData = allCompanyData.filter((item) => {
      return !obj[item.x] ? obj[item.x] = true : false;
    })

    filteredAllCompanyData.forEach((item) => {
      return item.x = moment(item.x).format('MMMM Do');
    })

    filteredCompanyData.forEach((item) => {
      return item.x = moment(item.x).format('MMMM Do');
    })

    console.log(filteredAllCompanyData)
    console.log(filteredCompanyData)

    return (
      <VictoryChart domain={{y: [0, 100]}}>
          <VictoryGroup>
          <VictoryLine
          data={filteredCompanyData} 
          style={{data: {stroke: '#FF00FF', strokeWidth: 1}}}
          />

          <VictoryLine
          data={filteredAllCompanyData}
          style={{data: {stroke: '#00BFFF', strokeWidth: 1}}}
          />
          </VictoryGroup>
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