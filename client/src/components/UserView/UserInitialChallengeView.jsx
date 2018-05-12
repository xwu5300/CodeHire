import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2'

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
    })
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

    ${this.props.initial_challenge[0].function_name}(${input})
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
    let examplesS = this.props.initial_challenge[0].examples.replace(/"/g, "'")
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
        <h1>{this.props.initial_challenge[0].name}</h1>
        <h2>{this.props.initial_challenge[0].title}</h2>
        <div>
          difficulty: {this.props.initial_challenge[0].difficulty}
        </div>
        <div>
          instruction: {this.props.initial_challenge[0].instruction}
        </div>
        <div>
          examples: { `input: ${exampleInput}                 output:${exampleOutput}`}
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
