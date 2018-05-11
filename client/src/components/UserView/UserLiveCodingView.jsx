import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

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
  //   let func = this.props.location.challenge.parameters
  //   let reg = new RegExp(`${func}`, 'g')
  //
  //   let testCaseS = this.props.location.challenge.test_cases.replace(/"/g, "'")
  //   let testCaseD = this.props.location.challenge.test_cases.replace(/'/g, '"')
  //   let input = JSON.parse(testCaseD)[0]
  //   let output = JSON.parse(testCaseD)[1]
  //
  //   let newString = `${this.state.code.replace(reg, `${input}`)}
  //
  // ${this.props.location.challenge.function_name}('${input}')
  //   `
  //   console.log('the new string', newString)
  //   let answer = eval(newString)
  //   console.log('my answer and output', answer, output)
  //   console.log(answer === output)

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
        if (result === true) {
          swal(
            'Success!',
            'You answered our challenge correctly!',
            'success'
          )
        } else {
          swal(
            'Sorry!',
            'The answer you submitted was not correct',
            'error'
          )
        }
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
    console.log('renderrrrrrrrrrrrrrrrrrr')
    console.log('props for live coding', this.props.location.challenge)
    return (
      <div>
        <h1>{this.props.location.challenge.name}</h1>
        <br/>
        <br/>
        <h2>Title: {this.props.location.challenge.title}</h2>
        <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
        <div> Instructions: {this.props.location.challenge.instruction}</div>
        <div>
          examples: { `input: ${exampleInput}                 output:${exampleOutput}`}
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
