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

    let string = `${this.state.code}

    ${this.props.location.challenge[0].function_name}()
     `
    let answer = eval(string)
    console.log('the answer submitted is', answer)
  }

  

  render() {
    return (
      <div>
        <h1>{this.props.location.challenge.name}</h1>
        <br/>
        <br/>
        <h2>Title: {this.props.location.challenge.title}</h2>
        <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
     

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
      <button onClick={this.handleSubmit}> Submit Answer </button>

      <div> Instruction: </div>
      <div>{this.props.location.challenge.instruction} </div>
      </div>
     )
  }
}

export default UserLiveCodingView;
