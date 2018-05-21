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

  componentDidMount() {
    this.props.fetchAllResults()
  }

  handleChange(e) {
    this.setState({
      currentChallenge: e.target.value
    })
  }

  successRate(arr, params, category) {
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
    console.log('props on render', this.props)
    let IndustrySuccess = this.successRate(this.props.all_results, categories, "category")
    let CompanySuccess = this.successRate(this.props.results, categories, "category")

    let Industry = this.props.all_results.map((data) => {
      return {x: data.category, y: Math.round(IndustrySuccess[data.category]* 100) }
    }).sort((function(a,b) {
      if (a.x > b.x) {
        return 1
      } else {
        return -1
      }
    }))

    let Company = this.props.results.map((data) => {
      return {x: data.category, y: Math.round(CompanySuccess[data.category] * 100)}
    }).sort((function(a,b) {
      if (a.x > b.x) {
        return 1
      } else {
        return -1
      }
    }))

    //
    // let DifficultySuccess = this.successRate(this.props.results, difficulty, "difficulty")
    //
    // let Difficulty = this.props.results.map((data)=> {
    //   return {x: data.difficulty, y: DifficultySuccess[data.difficulty] * 100}
    // }).sort((function(a,b) {
    //   if (a.x > b.x) {
    //      return 1
    //    } else {
    //      return -1
    //    }
    // }))

    // console.log(Difficulty)
    //grey is industry
    //orange is company
    return (
      <div>
        <div style={{ width: `650px`, margin: `auto`, paddingTop: '20' }}>
          <VictoryChart domainPadding={50} padding={{ left: 70, right: 20, bottom: 50, top: 50 }}>
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
              tickCount={15}
              tickValues={[10,20,30,40,50,60,70,80,90,100]}
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
              colorScale={["#C0C0C0", "Orange"]}
              animate={{
                duration: 500,
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
              labels={(d) => `${d.y}%`}
              data={Company}
            />
            </VictoryGroup>
          </VictoryChart>
        </div>
        <select value={this.state.currentChallenge} onChange={ (e)=> this.handleChange(e)} >
          {this.props.results.map((challengeResult, i) => {
            return <option key={i}>{challengeResult.title}</option>
          })}
        </select>
      </div>
    )


      // if (this.props.results.length) {
      //   return (
      //   <div>
      //       <div>Name: {this.props.results[0].name}</div>
      //       <div>Photo</div>
      //       <div>Information: {this.props.results[0].information}</div>
      //       <div>Skills: {this.props.results[0].candidate_skills}</div>
      //       <div>Phone: {this.props.results[0].phone}</div>
      //       <br/>
      //       <br/>
      //       <div> Challenges:
      //       {this.props.results.map((result, i) => {
      //           let isPassed = 'Failed';
      //           let isInitial = '';
      //           if (result.user_passed) {
      //               isPassed = 'Passed';
      //           }
      //           if (result.isInitial) {
      //               isInitial = 'Initial Challenge'
      //           }
      //           return (
      //           <div key={i}>
      //           <div>Title: {result.title}    Difficulty: {result.difficulty}   {isInitial}, {isPassed}, {result.score}</div>
      //
      //           <div>Instruction: {result.instruction}</div>
      //           <div>Completed At: {moment(result.completed_at).format('MMMM Do YYYY dddd, h:mm A')}</div>
      //           <div>{result.code}</div>
      //           <br/>
      //           <br/>
      //           </div>)
      //       })}
      //       </div>
      //   </div>
      //   )
      // } else {
      //   return null;
      // }
  }
}

export default UserResults;

//
// <div>
//   <div style={{ width: `650px`, margin: `auto`, paddingTop: '20' }}>
//     <VictoryChart domainPadding={50} padding={{ left: 70, right: 20, bottom: 50, top: 50 }}>
//         <VictoryLabel
//           text={`Average Results Per Category vs. Yours`}
//           verticalAnchor={"end"}
//           x={120}
//           y={30}
//         />
//         <VictoryAxis
//           axisLabelComponent={<VictoryLabel dy={9}/>}
//           label={"Category"}
//         />
      //  <VictoryAxis
      //   tickLabelComponent={<VictoryLabel x={50} />}
      //   axisLabelComponent={<VictoryLabel dy={-32} />}
      //   tickCount={15}
      //   tickValues={[10,20,30,40,50,60,70,80,90,100]}
      //   tickFormat={(p) => `${p} %`}
      //   dependentAxis
      //   fixLabelOverlap={true}
      //   label={"Pass Percentage"}
      //   style={{
      //    tickLabels: {
      //      fontSize: 10,
      //      fill: "black",
      //    },
      //   }}
      // />
//       <VictoryGroup offset={27}
//         colorScale={["#C0C0C0", "Orange"]}
//         animate={{
//           duration: 500,
//           onLoad: { duration: 500 },
//         }}
//         categories={{
//           x:["Algorithms", "Data Structures",  "Systems Design"]
//         }}
//       >
//       <VictoryBar
//         style={{
//           data: {
//             width: 25
//           },
//           labels: {
//             fontSize: 10
//           }
//         }}
//         labels={(d) => `${d.y}%`}
//         data={Industry}
//       />
//       <VictoryBar
//         style={{
//           data: {
//             width: 25
//           },
//           labels: {
//             fontSize: 10
//           }
//         }}
//         labels={(d) => `${d.y}%`}
//         data={Company}
//       />
//       </VictoryGroup>
//     </VictoryChart>
//   </div>
// </div>
