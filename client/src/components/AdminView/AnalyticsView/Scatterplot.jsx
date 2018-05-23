import React, { Component } from 'react';
import moment from 'moment';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip, VictoryZoomContainer, VictoryLegend } from 'victory';

const difficulty = ["1", "2", "3", "4", "5"]

class Scatterplot extends Component {
  constructor() {
    super();
    this.state = {
      currentChallenge: []
    }

    this.successRate = this.successRate.bind(this)
  }

  successRate(arr, category, params) {
    let pass = {}
    let count = {}
    let results = {}

    for (let data of arr) {
      count[data[category]] = count[data[category]] + 1 || 1
      if (data['user_passed'] === true) {
        pass[data[category]] = pass[data[category]] + 1 || 1
      }
    }
    for (let element of params) {
      let passRate
      pass[element] ? passRate = pass[element] / count[element] : 0
      results[element] = passRate || 0
    }

    return results
  }

  render() {
    let scheduleIds = [...new Set(this.props.companyResults.map(item => item.company_schedule_id))]
    let challengeSuccessRates= scheduleIds.map((scheduleId) => {
      return this.successRate(this.props.companyResults, 'challenge_id', [scheduleId])
    })

    let successRatesPerChallenge = (arr) => {
      let results = {}
      for (var data of arr) {
        let entry = Object.entries(data)

        results[entry[0][0]] = entry[0][1]
      }
      return results
    }

    let DifficultySuccess = successRatesPerChallenge(challengeSuccessRates)

    let Difficulty = this.props.companyResults.map((data)=> {
      let passRate = Math.round(DifficultySuccess[data.company_schedule_id] * 100)
      return {x: data.difficulty, y: passRate, label:
       `Challenge : ${data.title}
         Pass Rate: ${passRate}%`}
      }
    )
    return (
      <div>
        <div className="challenge-results-graph">
          <VictoryChart domainPadding={50} domain={{ x: [0, 5], y: [0, 80] }} >
            <VictoryLabel
              text={`Pass Rates Per Difficulty`}
              verticalAnchor={"end"}
              x={160}
              y={25}
            />
            <VictoryLabel
              text={`Hover over each point to see details`}
              style={{fontSize: 8}}
              verticalAnchor={"end"}
              x={178}
              y={38}
            />
            <VictoryAxis
              axisLabelComponent={<VictoryLabel style={{fontSize: 12, fontWeight: 500}} />}
              label={"Difficulty"}
              style={{
                tickLabels: {
                  fontSize: 10,
                  padding: 5
                }
              }}
            />
            <VictoryAxis
              axisLabelComponent={<VictoryLabel dy={-10} style={{fontSize: 12, fontWeight: 500}} />}
              tickFormat={(p) => `${p} %`}
              dependentAxis
              label={"Pass Rate"}
              style={{
                tickLabels: {
                  fontSize: 10,
                  padding: 5,
                  fill: "black",
                }
              }}
            />
            <VictoryScatter
              labelComponent={
              <VictoryTooltip
                style={{fontSize: 7}}
                pointerLength={(d) => d.y = -8}
                flyoutStyle={{stroke: '1'}}
              />}
              style={{ data: { fill: "#c43a31" } }}
              size={2}
              data={Difficulty}
            />
          </VictoryChart>
        </div>
      </div>
    )
  }
}

export default Scatterplot;

// containerComponent={
// <VictoryZoomContainer
//   zoomDomain={{x: [5, 35], y: [0, 100]}}
// />}
