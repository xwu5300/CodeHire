import React, { Component } from 'react';
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryContainer, VictoryVoronoiContainer, VictoryTheme, VictoryLine, VictoryTooltip, VictoryLegend } from 'victory';
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
      return {x: data.time, y: Math.round(successRate[data.company_schedule_id] * 100, 2), label: 
        `Challenge: ${data.title}
        Difficulty: ${data.difficulty}
        Pass Rate: ${Math.round(successRate[data.company_schedule_id] * 100, 2)}%`}
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
      return item.x = Number(moment(item.x).format('DD'));
    })

    filteredCompanyData.forEach((item) => {
      return item.x = Number(moment(item.x).format('DD'));
    })

    let combinedData = filteredAllCompanyData.concat(filteredCompanyData).sort((a, b) => {
      return a.x - b.x;
    });

    return (
      <div className="challenge-results-graph">
        <VictoryChart domain={{x: [0, 30], y: [0, 100]}} animate={{onEnter: {duration: 100}}} containerComponent={
          <VictoryVoronoiContainer/>
        }>
            <VictoryLegend
            x={350} y={10}
            style={{labels:{fontSize: 7}, padding: '50px'}}
            orientation="vertical"
           
            colorScale={['#00BFFF', '#FF00FF']}
            data={[{name: 'All Company Challenges'}, {name: "Your Challenges"}]}
            />

            <VictoryAxis
            axisLabelComponent={<VictoryLabel 
            style={{
              fontSize: 12, 
              fontWeight: 500}} 
            />}
            label={"Time (days in month)"}
            tickCount={10}
            style={{
              tickLabels: {
                fontSize: 10, 
                padding: 5
              }
             }}
            />
            <VictoryAxis 
            tickFormat={(p) => `${p} %`}
            dependentAxis
            label={"Pass Rate"}
            axisLabelComponent={<VictoryLabel dy={-10} style={{fontSize: 12, fontWeight: 500}} />}
            style={{
              tickLabels: {
                fontSize: 10,
                padding: 5
              }
             }}
            />
            <VictoryLine
            labelComponent={<VictoryTooltip
                style={{fontSize: 8}}
                pointerLength={5}
                flyoutStyle={{stroke: 'none', opacity: '.1'}}
                cornerRadius={0}
              />}
            data={filteredCompanyData} 
            style={{data: {stroke: '#FF00FF', strokeWidth: 2}}}
            />
            <VictoryLine
            data={filteredAllCompanyData}
            style={{data: {stroke: '#00BFFF', strokeWidth: 2}}}
            />

            <VictoryLabel
            text={`Average Pass Rate`}
            verticalAnchor={"end"}
            x={180}
            y={15}
            />
        </VictoryChart>
      </div>
    )
  }
}





export default AllChallengeResults;