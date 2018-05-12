import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2'
import moment from 'moment';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class UserLiveCodingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: '',
      seconds: '',
      code: `function ${this.props.location.challenge.function_name}(${this.props.location.challenge.parameters}) {

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
      console.log('TIME', minutes, seconds);
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
    this.setState({
      code: newValue
    }, ()=> console.log(this.state.code))
    this.socket.emit('typing', newValue, event, this.props.user_id);
  }

  handleSubmit() {
    let func = this.props.location.challenge.parameters
    let reg = new RegExp(`${func}`, 'g')

    let testCaseS = this.props.location.challenge.test_cases.replace(/"/g, "'")
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

    let newString = `${this.state.code.replace(reg, `${func}`)}

    ${this.props.location.challenge.function_name}(${input})
    `
    let answer = eval(newString)



    let result = JSON.stringify(answer) === output

    swal({
      title: 'Are you sure?',
      text: "You can only submit once!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((clickResult) => {
      if (clickResult.value) {
        let isPassed = answer === output;
        let time = moment(Date.now()).format();
        let score;
        if (result === true) {
          swal(
            'Success!',
            'You answered our challenge correctly!',
            'success'
          )
          score = 90;
        } else {
          swal(
            'Sorry!',
            'The answer you submitted was not correct',
            'error'
          )
        }
        let returnToDash = () => (this.props.saveResults(isPassed, newString, score, time, this.props.initial_challenge[0].id, this.props.initial_challenge[0].company_id, this.props.user_id, true, this.props.initial_challenge[0].id, () => {
          this.props.history.push('/user/schedule')
        }))
        setTimeout(returnToDash, 750)
      }
    })
  }

  render() {
    let examplesS = this.props.location.challenge.examples.replace(/"/g, "'")
    let examplesD = examplesS.replace(/'/g, '"')
    let examples = JSON.parse(examplesD)
    let exampleInput = examples[0].map((el)=> {
      return JSON.stringify(el)
    }).join(',')
    let exampleOutput = examples[1].map((el)=> {
      return JSON.stringify(el)
    }).join(',')

    return (
      <div>
        <div className="ui orange three item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div>
        </div>
        <h1>{this.props.location.challenge.name}</h1>
        <br/>
        <h2>Title: {this.props.location.challenge.title}</h2>
        <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
        <div> Instructions: {this.props.location.challenge.instruction}</div>
        <div>
          examples: { `input: ${exampleInput} output:${exampleOutput}`}
        </div>
        <div> Time Limit: { this.state.minutes + ':' + this.state.seconds }</div>
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

export default UserLiveCodingView;
