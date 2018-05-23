import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2';
import moment from 'moment';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';


class UserInitialChallengeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'monokai',
      code: `function ${this.props.initial_challenge[0].function_name}(${this.props.initial_challenge[0].parameters}) {
}`,
      inChallenge: true,
      submission: '',
      submitted: false,
      exampleInputs: [],
      exampleOutputs: [],
      duration: this.props.initial_challenge[0].duration,
      timeRemaining: '',
    }

    this.onLoad = this.onLoad.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.autoSubmit = this.autoSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
    this.getExamples = this.getExamples.bind(this)
    this.saveResults = this.saveResults.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateTimer(display) {
    this.setState({
      timeRemaining: display
    })
  }

  startTimer(duration, display) {
    let timer = duration
    let minutes
    let seconds
    let countdown = setInterval( ()=> {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display = minutes + ":" + seconds;
      this.updateTimer(display)

      if (--timer < 0 && !this.state.submitted) {
        this.autoSubmit()
        clearInterval(countdown)
      }
    }, 1000);
  }

  onLoad() {
    let challengeDuration = 60 * this.state.duration;
    let display = this.state.duration
    this.startTimer(challengeDuration, display);
  }

  autoSubmit() {
    let id = this.props.initial_challenge[0].id
    let company_id = localStorage.getItem('companyId')
    let user_id = localStorage.getItem('userId')
    this.props.saveResults(null, 'f', this.state.code, 90, moment(Date.now()).format(), id, company_id, user_id, true , id, () => {

      swal(
        {title: 'Time Ran Out',
         text: 'The current state of your code was saved and submitted',
         allowOutsideClick: false,
         type: 'info'}).then(() =>{
          this.props.history.push('/user')
         }
        )
    })
  }

  onChange(newValue, event) {
    this.setState({
      code: newValue
    })
  }

  handleTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }

  getExamples() {
    let examplesS = this.props.initial_challenge[0].examples.replace(/"/g, "'")
    let examplesD = examplesS.replace(/'/g, '"')
    let examples = JSON.parse(examplesD)
    let exampleInputs = examples[0].map((el)=> {
      return JSON.stringify(el)
    })
    let exampleOutputs = examples[1].map((el)=> {
      return JSON.stringify(el)
    })
  }

  saveResults(companyScheduleId, result, submission, score, time) {
    let id = this.props.initial_challenge[0].id
    let company_id = localStorage.getItem('companyId')
    let user_id = localStorage.getItem('userId')
    this.props.saveResults(null, result, submission, score, time, id, company_id, user_id, true , id, () => {
      this.props.fetchCandidateInitialResults(localStorage.getItem('companyId'), user_id, ()=> {})
    })
  }

  checkAnswer() {
    let params = this.props.initial_challenge[0].parameters
    let testCaseS = this.props.initial_challenge[0].test_cases.replace(/"/g, "'")
    let testCaseD = testCaseS.replace(/'/g, '"')

    let tests = JSON.parse(testCaseD)
    let input = tests[0].map((el)=> {
      return JSON.stringify(el)
    }).join(',')
    let output = tests[1].map((el)=> {
      return JSON.stringify(el)
    }).join(',')
    input = input.replace(/'/g, "")
    output = output.replace(/'/g, "")

    let reg = new RegExp(`${params}`, 'g')
    let submittedCode = `${this.state.code.replace(reg, `${params}`)}

${this.props.initial_challenge[0].function_name}(${input})`

    if (this.state.inChallenge) {
      window.onerror = function(msg, url, lineNo, columnNo, error){
        swal(
          'There was an error in your code',
          'Double check your syntax and try again!',
          'warning'
        )
      }
    }

    let answer = eval(submittedCode)
    this.setState({
      submission: submittedCode
    })
    return JSON.stringify(answer) === output
  }

  handleSubmit() {
    let result = this.checkAnswer()
    let score = 90;  //hard coded
    let time = moment(Date.now()).format();
    swal({
      title: 'Are you sure?',
      text: "You can only submit once!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((clickResult) => {
      if (clickResult.value) {
        this.setState({
          submitted: true
        })
        let submission = this.state.submission
        this.saveResults(null, result, submission, score, time)
        var thatProps = this.props
        if (result === true) {
          swal(
            {title: 'Success!',
             text: 'You answered our challenge correctly!',
             type: 'success'}).then(function() {
              thatProps.history.push('/user/schedule')
             }
            )
        } else {
          swal(
            {title: 'Sorry!',
             text: 'The answer you submitted was not correct',
             type: 'error'}).then(function() {
              thatProps.history.push('/user/schedule')
             })
        }
      }
    })
  }

  render() {
    return (
      <div>
          <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ localStorage.getItem('username') }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
        <h1>{this.props.initial_challenge[0].name}</h1>
        <h2>{this.props.initial_challenge[0].title}</h2>
        <div>
          difficulty: {this.props.initial_challenge[0].difficulty}
        </div>
        <div>
          instruction: {this.props.initial_challenge[0].instruction}
        </div>
        <div> time left: {this.state.timeRemaining} </div>
        <div className="examples">
          examples:  {this.state.exampleInputs.map((input, i) => {
            return <div className="input" key={i}>{input}</div>
          })}
          {this.state.exampleOutputs.map((output, i) => {
            return <div className="output" key={i}>{output}</div>
          })}
        </div>
        <AceEditor
          mode="javascript"
          theme={this.state.theme}
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
        <select value={this.state.theme} onChange={this.handleTheme}>
          <option value='monokai'>Monokai</option>
          <option value='github'>Github</option>
          <option value='twilight'>Twilight</option>
          <option value='solarized_dark'>Solarized Dark</option>
          <option value='terminal'>Terminal</option>
        </select>
        <button onClick={this.handleSubmit}> Submit Answer </button>
      </div>
    )
  }
}

export default withRouter(UserInitialChallengeView);
