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
    let func = this.props.location.challenge.parameters
    let reg = new RegExp(`${func}`, 'g')

    let testCaseS = this.props.location.challenge.test_cases.replace(/"/g, "'")
    let testCaseD = this.props.location.challenge.test_cases.replace(/'/g, '"')
    let input = JSON.parse(testCaseD)[0]
    let output = JSON.parse(testCaseD)[1]

    let newString = `${this.state.code.replace(reg, `${input}`)}

  ${this.props.location.challenge.function_name}('${input}')
    `
    console.log('the new string', newString)
    let answer = eval(newString)
    console.log('my answer and output', answer, output)
    console.log(answer === output)
  }

  render() {
    console.log('PROOOOOOOOOOOOOPS', this.props.location.challenge)
    return (
      <div>
        <h1>{this.props.location.challenge.name}</h1>
        <br/>
        <br/>
        <h2>Title: {this.props.location.challenge.title}</h2>
        <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
        <div> Instructions: {this.props.location.challenge.instruction}</div>
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
