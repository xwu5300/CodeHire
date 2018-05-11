import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';
import moment from 'moment';

import ChallengeClock from '../../ChallengeClock.jsx';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class UserLiveCodingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: '',
      seconds: '',
      code: `function placeholder(params) {

}` }

    this.socket = socketClient();

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)


    this.socket.on('add char', (chars)=> {
      this.setState({
        code: chars
      }, ()=> console.log(this.state.code))
    })

    this.socket.on('show time_limit', (minutes, seconds) => {
      this.setState({ minutes: minutes, seconds: seconds });
    })
  }

  componentDidMount() {
     this.socket.emit('candidate enter', this.props.username, this.props.user_id, this.props.current_company_calendar);
  }

  componentWillUnmount() {
    this.socket.emit('candidate disconnect', this.props.username, this.props.user_id, this.props.current_company_calendar);
  }

  onChange(newValue, event) {
    this.socket.emit('typing', newValue, event, this.props.user_id);
  }

  handleSubmit() {
    let func = this.props.location.challenge.parameters
    let reg = new RegExp(`${func}`, 'g')

    let testCaseS = this.props.location.challenge.test_cases.replace(/"/g, "'")
    let testCaseD = this.props.location.challenge.test_cases.replace(/'/g, '"')
    let input = JSON.parse(testCaseD)[0]
    let output = JSON.parse(testCaseD)[1]

    let newString = `${this.state.code.replace(reg, `${func}`)}

  ${this.props.location.challenge.function_name}('${input}')
    `
    console.log('the new string', newString)
    let answer = eval(newString)
    console.log('my answer and output', answer, output)
    console.log(answer === output)

    //saving results to db;
    let score = 90;  //hard coded
    let isPassed = answer === output;
    let time = moment(Date.now()).format();
    this.props.saveResults(isPassed, newString, score, time,this.props.location.challenge.challenge_id, this.props.location.challenge.company_id, this.props.location.challenge.candidate_id, false, this.props.location.challenge.id, () => {
      this.props.history.push('/user')
    })
  }

  

  render() {

    return (
      <div>
      <button className='ui green button' onClick={() => {this.props.history.push('/user/profile')}}>Edit Profile</button>
      <button className='ui green button' onClick={() => {this.props.history.push('/user')}}>Dash Board</button>
      <button className='ui green button' onClick={() => {this.props.history.push('/user/companylist')}}>Company Challenge list</button> 
        <h1>{this.props.location.challenge.name}</h1>
        <br/>
        <br/>
        <h2>Title: {this.props.location.challenge.title}</h2>
        <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
        <div> Instructions: {this.props.location.challenge.instruction}</div>
        <div> Time Limit: {this.props.location.challenge.duration} Minutes</div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="codehire"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          editorProps={{$blockScrolling: Infinity}}
          value={this.state.code}
          setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}/>
      <button onClick={this.handleSubmit}> Submit Answer </button>

      <div> Instruction: </div>
      <div>{this.props.location.challenge.instruction} </div>
      </div>
     )
  }
}

export default withRouter(UserLiveCodingView);
