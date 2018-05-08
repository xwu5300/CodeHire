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
      code: `function ${this.props.initial_challenge[0].function_name}(${this.props.initial_challenge[0].parameters}) {

}` }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(newValue, event) {
    this.setState({
      code: newValue
    }, ()=> console.log(this.state.code))
  }

  handleSubmit() {
    let string = `${this.state.code}

${this.props.initial_challenge[0].function_name}()
     `
    let answer = eval(string)
    console.log('the answer submitted is', answer)
  }

  render() {
    return (
      <div>
        <h1>{this.props.initial_challenge[0].title}</h1>
        <div>
          instruction: {this.props.initial_challenge[0].instruction}
        </div>
        <div>
          difficulty: {this.props.initial_challenge[0].difficulty}
        </div>
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


      </div>
    )
  }
}


//${this.props.initial_challenge[0].name}
// <div> {this.state.instructions} </div>
//
//
// <h1>{this.props.initial_challenge[0].name  }</h1>
// <h2>Initial Challenge</h2>
// <h3>{this.props.initial_challenge[0].title}</h3>

// <div>
//   instruction: {this.props.initial_challenge[0].instruction}
// </div>
// <div>
// test case: {this.props.initial_challenge[0].test_cases}
// </div>
// <div>
//   timelimit:  {this.props.initial_challenge[0].timelimit}
// </div>
// </div>
export default UserInitialChallengeView;
