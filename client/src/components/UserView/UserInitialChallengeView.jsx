import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

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
}` }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
  }

  onChange(newValue, event) {
    this.setState({
      code: newValue
    }, ()=> console.log(this.state.code))
  }

  handleTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }
  handleSubmit() {
      let func = this.props.initial_challenge[0].parameters
      let reg = new RegExp(`${func}`, 'g')

      let testCaseS = this.props.initial_challenge[0].test_cases.replace(/"/g, "'")
      let testCaseD = this.props.initial_challenge[0].test_cases.replace(/'/g, '"')
      let input = JSON.parse(testCaseD)[0]
      let output = JSON.parse(testCaseD)[1]

      let newString = `${this.state.code.replace(reg, `${input}`)}
      
  ${this.props.initial_challenge[0].function_name}('${input}')
      `
      console.log('newstring is', newString)
      let answer = eval(newString)
      // console.log('the answer submitted is', answer)
      console.log(answer === output)
    }

  render() {
    return (
      <div>
        <h1>{this.props.initial_challenge[0].name}</h1>
        <h2>{this.props.initial_challenge[0].title}</h2>
        <div>
          difficulty: {this.props.initial_challenge[0].difficulty}
        </div>
        <div>
          instruction: {this.props.initial_challenge[0].instruction}
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

export default UserInitialChallengeView;
