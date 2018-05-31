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
    this.checkOnTab = this.checkOnTab.bind(this)
    this.tabOutSubmission = this.tabOutSubmission.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
    this.getExamples = this.getExamples.bind(this)
    this.saveResults = this.saveResults.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.countdown = null;
  }

  componentDidMount() {
    this.getExamples()
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }
  
  updateTimer(display) {
    this.setState({
      timeRemaining: display
    })
  }

  checkOnTab() {
    this.setState({
      tabHidden: document.hidden
    }, function() {if (this.state.tabHidden) {

      this.tabOutSubmission();

    }})
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  startTimer(duration, display) {
    let timer = duration
    let minutes
    let seconds
    this.countdown = setInterval( ()=> {

      this.checkOnTab();

      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display = minutes + ":" + seconds;
      this.updateTimer(display)

      if (--timer < 0 && !this.state.submitted) {
        this.autoSubmit()
        clearInterval(this.countdown)
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

  tabOutSubmission() {
    let id = this.props.initial_challenge[0].id
    let company_id = localStorage.getItem('companyId')
    let user_id = localStorage.getItem('userId')
    this.props.saveResults(null, 'f', this.state.code, 90, moment(Date.now()).format(), id, company_id, user_id, true , id, () => {

      swal(
        {title: 'You Left Your Coding View',
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
      return (el)
    })
    let exampleOutputs = examples[1].map((el)=> {
      return (el)
    })

    this.setState({
      exampleInputs : exampleInputs,
      exampleOutputs : exampleOutputs
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
    let testCases = JSON.parse(this.props.initial_challenge[0].test_cases)

    let inputs = testCases[0]
    let outputs = testCases[1].map((el)=> {
      return JSON.parse(el)
    })

    let answerResults = inputs.map((input) => {
      let reg = new RegExp(`${params}`, 'g')
      input = JSON.parse(input)

      let submittedCode;
      if (params.split(',').length> 1) {
        submittedCode = `${this.state.code.replace(reg, `${params}`)}

${this.props.initial_challenge[0].function_name}('${input[0]}', '${input[1]}')`
      } else {

        submittedCode = `${this.state.code.replace(reg, `${params}`)}

${this.props.initial_challenge[0].function_name}('${input}')`
      }
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
      return answer
    })
    return JSON.stringify(answerResults) === JSON.stringify(outputs)
  }

  handleSubmit() {
    let result = this.checkAnswer()
    let score = 90;
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
        <i onClick={ () => this.props.history.push('/user/schedule') } className="arrow alternate circle left icon"></i>

         <p className='leave_warning'>Please do not leave this coding view. <br /> Your code will automatically be submitted.</p>

          <div className='ui horizontal segments user_liveCoding_container' style={{ padding: '30px', margin: 'auto' }}>
            <div className='ui padded segment'>

            <select value={this.state.theme} onChange={this.handleTheme}>
              <option value='monokai'>Monokai</option>
              <option value='github'>Github</option>
              <option value='twilight'>Twilight</option>
              <option value='solarized_dark'>Solarized Dark</option>
              <option value='terminal'>Terminal</option>
            </select>

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
              
              <button className='ui green button' style={{ display: 'block', margin: 'auto', width: '40%', position: 'relative', right: '25px', top: '5px' }} onClick={this.handleSubmit}>Submit Answer</button>
            </div>


            <div className='ui padded segment user_liveCoding_rightSeg' style={{ maxWidth: '40%'}}>
              <h1>{this.props.initial_challenge[0].name}</h1>
              <div><b>Title:</b> {this.props.initial_challenge[0].title}</div>
              <div><b>difficulty:</b><span style={{color: '#f2711c'}}>  {this.props.initial_challenge[0].difficulty}</span></div>
              <div><b>instruction:</b>{this.props.initial_challenge[0].instruction}</div>
              {this.state.exampleInputs.length > 0 ?
              <h3>
                <b>Examples:</b>
                {this.state.exampleInputs.map((input, i) => {
                  return <div className="examples" key={i}>{input}</div>
                })} ,
                {this.state.exampleOutputs.map((output, i) => {
                  return <div className="examples" key={i}>{output}</div>
                })}
              </h3>
              : null }
            <div className='candidate_time_limit'><span style={{color: '#f2711c'}}>Time Limit:</span>{this.state.timeRemaining} </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserInitialChallengeView);
