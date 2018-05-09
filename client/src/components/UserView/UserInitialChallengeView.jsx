import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

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

  handleTheme() {
    let currentTheme
    if (this.state.theme === 'monokai') {
      currentTheme = 'textmate'
    } else {
      currentTheme = 'monokai'
    }
    this.setState({
      theme: currentTheme
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
          instruction: {this.props.initial_challenge[0].instruction}
        </div>
        <div>
          difficulty: {this.props.initial_challenge[0].difficulty}
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
        <button onClick={this.handleTheme}>Change theme</button>
        <button onClick={this.handleSubmit}> Submit Answer </button>


      </div>
    )
  }
}

export default UserInitialChallengeView;
