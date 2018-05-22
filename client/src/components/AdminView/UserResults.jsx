import React, { Component } from 'react';
import moment from 'moment';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, VictoryTheme, VictoryScatter } from 'victory';

const categories = ['algorithms', 'data structures', 'system design']
const difficulty = ["1", "2", "3", "4", "5"]

class UserResults extends Component {
  constructor() {
    super();
    this.state = {
      currentChallenge: []
    }

    this.successRate = this.successRate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.fetchChallengeData(e.target.value)
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
    console.log(this.props)
    let IndustrySuccess = this.successRate(this.props.all_results, "category", categories)
    let CompanySuccess = this.successRate(this.props.company_data, "category", categories)
    let ChallengeSuccess = this.successRate(this.props.challenge_data,  "category", categories)

    let Industry = this.props.all_results.map((data) => {
      let passPercent = Math.round(IndustrySuccess[data.category] * 100)
      return {x: data.category, y: passPercent }
    })
    // .sort((function(a,b) {
    //   if (a.x > b.x) {
    //     return 1
    //   } else {
    //     return -1
    //   }
    // }))

    let Company = this.props.results.map((data) => {
      let passPercent = Math.round(CompanySuccess[data.category] * 100)
      return {x: data.category, y: passPercent}
    })
    // .sort((function(a,b) {
    //   if (a.x > b.x) {
    //     return 1
    //   } else {
    //     return -1
    //   }
    // }))

    let Challenge = this.props.challenge_data.map((data) => {
      let passPercent = Math.round(ChallengeSuccess[data.category] * 100)
      return {x: data.category, y: passPercent }
    })
    // .sort((function(a,b) {
    //   if (a.x > b.x) {
    //     return 1
    //   } else {
    //     return -1
    //   }
    // }))

    for (let category of categories) {
      if (!Challenge.some(data => data['x'].includes(category))) {
        Challenge.push({x: category, y: 0})
      }
    }

    Challenge.sort((function(a,b) {
      if (a.x > b.x) {
        return 1
      } else {
        return -1
      }
    }))


    let scheduleIds = [...new Set(this.props.company_data.map(item => item.company_schedule_id))]
    let DifficultySuccessRates = scheduleIds.map((scheduleId) => {
      return this.successRate(this.props.company_data, 'challenge_id', [scheduleId])
    })

    let D = (arr) => {
      let results = {}
      for (var data of arr) {
        let entry = Object.entries(data)

        results[entry[0][0]] = entry[0][1]
      }
      return results
    }

    let DifficultySuccess = D(DifficultySuccessRates)


    let Difficulty = this.props.company_data.map((data)=> {
      return {x: data.difficulty, y: DifficultySuccess[data.company_schedule_id] * 100}
    })
    console.log(Difficulty)

    return (
      <div>
        <label>
        Select a Challenge
        <select value={this.state.currentChallenge.title} onChange={ (e)=> this.handleChange(e)}>
          {this.props.results.map((challengeResult, i) => {
             return <option key={i} value={challengeResult.challenge_id}>{challengeResult.title}</option>
          })}
        </select>
        </label>
        <div style={{ width: `650px`, margin: `auto`, paddingTop: '20' }}>
        <VictoryChart domainPadding={50} domain={{y: [0, 80]}} padding={{ left: 70, right: 20, bottom: 50, top: 50 }}>
            <VictoryLabel
              text={`Average Results Per Category vs. Yours`}
              verticalAnchor={"end"}
              x={120}
              y={30}
            />
            <VictoryAxis
              axisLabelComponent={<VictoryLabel dy={9}/>}
              label={"Category"}
            />
             <VictoryAxis
              tickLabelComponent={<VictoryLabel x={50} />}
              axisLabelComponent={<VictoryLabel dy={-32} />}
              tickFormat={(p) => `${p} %`}
              dependentAxis
              fixLabelOverlap={true}
              label={"Pass Percentage"}
              style={{
               tickLabels: {
                 fontSize: 10,
                 fill: "black",
               },
              }}
            />
          <VictoryGroup offset={27}
            colorScale={["#C0C0C0", "Orange", "Red"]}
            animate={{
              duration: 600,
              onLoad: { duration: 500 },
            }}
            categories={{
              x:["Algorithms", "Data Structures",  "Systems Design"]
            }}
          >
          <VictoryBar
            style={{
              data: {
                width: 25
              },
              labels: {
                fontSize: 10
              }
            }}
            sortKey="x"
            labels={(d) => `${d.y}%`}
            data={Industry}
          />
          <VictoryBar
            style={{
              data: {
                width: 25
              },
              labels: {
                fontSize: 10
              }
            }}
            sortKey="x"
            labels={(d) => `${d.y}%`}
            data={Company}
          />
          <VictoryBar
            style={{
              data: {
                width: 25
              },
              labels: {
                fontSize: 10
              }
            }}
            labels={(d) => `${d.y}%`}
            data={Challenge}
          />
          </VictoryGroup>
        </VictoryChart>
        </div>
        <div style={{ width: `650px`, margin: `auto`, paddingTop: '20' }}>
          <VictoryChart theme={VictoryTheme.material} domain={{ x: [0, 5], y: [0, 100] }}>
            <VictoryLabel
               text={`Pass Rate Per Difficulty`}
               verticalAnchor={"end"}
               x={120}
               y={30}
            />
            <VictoryAxis
              axisLabelComponent={<VictoryLabel dy={20}/>}
              label={"Difficulty"}
            />
            <VictoryAxis
            tickLabelComponent={<VictoryLabel x={50} />}
            axisLabelComponent={<VictoryLabel dy={-28} />}
            tickCount={15}
            tickValues={[10,20,30,40,50,60,70,80,90,100]}
            tickFormat={(p) => `${p} %`}
            dependentAxis
            label={"Pass Percentage"}
            style={{
             tickLabels: {
               fontSize: 10,
               fill: "black",
             },
            }}
           />
            <VictoryScatter
              style={{ data: { fill: "#c43a31" } }}
              size={4}
              data={Difficulty}
            />
          </VictoryChart>
        </div>
      </div>
    )
  }
}

export default UserResults;
