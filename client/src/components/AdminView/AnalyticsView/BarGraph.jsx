import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip, VictoryZoomContainer, VictoryLegend } from 'victory';

const categories = ['algorithms', 'data structures', 'system design']

class BarGraph extends Component {
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
    console.log('pass and count', pass, count)
    for (let element of params) {

      let passRate
      pass[element] ? passRate = pass[element] / count[element] : 0
      results[element] = passRate || 0
    }

    return results
  }

  render() {
    console.log('props in bar', this.props)
    let IndustrySuccess = this.successRate(this.props.allResults, "category", categories)
    let CompanySuccess = this.successRate(this.props.companyResults, "category", categories)
    let ChallengeSuccess = this.successRate(this.props.companyResults,  "category", categories)

    let Industry = this.props.allResults.map((data) => {
      let passPercent = Math.round(IndustrySuccess[data.category] * 100)
      return {x: data.category, y: passPercent}
    })

    let Company = this.props.companyResults.map((data) => {
      let passPercent = Math.round(CompanySuccess[data.category] * 100)
      return {x: data.category, y: passPercent}
    })

    let Challenge = this.props.challengeData.map((data) => {
      let passPercent = Math.round(ChallengeSuccess[data.category] * 100)
      return {x: data.category, y: passPercent}
    })

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

    return (
      <div>
        <div className='bar_graph_dropdown'>
          <label>
            Select a Challenge
            </label>
            <select value={this.state.currentChallenge.title} onChange={ (e)=> this.handleChange(e)}>
              {this.props.challenges.map((challengeResult, i) => {
                return <option key={i} value={challengeResult.id}>{challengeResult.title}</option>
            })}
            </select>
          
        </div>
      <div className='ui container segment graph'>
        <div className="challenge-results-graph">
          <VictoryChart domainPadding={50} domain={{y: [0, 120]}} >
            <VictoryLegend
              x={145} y={30}
              style={{labels:{fontSize: 7}, padding: '50px'}}
              centerTitle
              orientation="horizontal"
              gutter={20}
              data={[
                { name: "Industry", symbol: { fill: "#C0C0C0"} },
                { name: "Company", symbol: { fill: "Orange" } },
                { name: "Challenge", symbol: { fill: "Red"}}
              ]}
            />
            <VictoryLabel
              text={`Average Results Per Category vs. Yours`}
              verticalAnchor={"end"}
              x={110}
              y={25}
            />
            <VictoryAxis
              axisLabelComponent={<VictoryLabel style={{fontSize: 12, fontWeight: 500}} />}
              label={"Category"}
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
              fixLabelOverlap={true}
              label={"Pass Rate"}
              style={{
              tickLabels: {
                fontSize: 10,
                padding: 5,
                }
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
              animate={{
                duration: 200,
                onLoad: { duration: 200 },
              }}
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
              data={Challenge}
            />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
      </div>
    )
  }
}

export default BarGraph;
