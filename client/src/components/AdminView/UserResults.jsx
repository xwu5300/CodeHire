import React, { Component } from 'react';
import moment from 'moment';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryGroup  } from 'victory';


class UserResults extends Component {
  constructor() {
    super();

  this.successRate = this.successRate.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllResults()
  }

  successRate(arr) {
    let pass = {}
    let count = {}
    let results = {}

    for (let data of arr) {
          count[data.category] = count[data.category] + 1 || 1
        if (data['user_passed'] === true) {
          pass[data.category] = pass[data.category] + 1 || 1
      }
    }
    let categories = ['algorithms', 'data structures', 'system design']
      for (let category of categories) {
        results[category] = pass[category] / count[category] || 0
    }

    return results
  }

  render() {
    console.log(this.props)
    let IndustrySuccess = this.successRate(this.props.all_results)
    let CompanySuccess = this.successRate(this.props.results)

    let Industry = this.props.all_results.map((data) => {
      return {x: data.category, y: IndustrySuccess[data.category]}
    }).sort((function(a,b) {
      if (a.x > b.x) {
        return 1
      } else {
        return -1
      }
    }))

    let Company = this.props.results.map((data) => {
      return {x: data.category, y: CompanySuccess[data.category]}
    }).sort((function(a,b) {
      if (a.x > b.x) {
        return 1
      } else {
        return -1
      }
    }))
    console.log('industry map', Industry)
    console.log('company map',  Company)

    return (
      <div>
      <VictoryChart domainPadding={80}>
        <VictoryGroup offset={20}
          colorScale={["tomato", "blue"]}
          animate={{
            duration: 1500,
            onLoad: { duration: 1000 },
            easing: "bounce"
          }}
          categories={{
            x:["Algorithms", "Data Structures",  "Design"]
          }}
        >
        <VictoryBar
          data={Industry}
        />
        <VictoryBar
          data={Company}
        />
        </VictoryGroup>
      </VictoryChart>
      </div>
    )
//
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
