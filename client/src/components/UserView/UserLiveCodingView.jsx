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
      title: 'greeting',
      params: 'param strings',
      instructions: `Instructions: buffalo buffalo buffalo buffalo buffalo buffalo`,
      code: `function placeholder(params) {

}` }

    this.socket = socketClient()
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    let username = 'wkimak'
    this.socket.on('connect', function(){
      this.socket.emit('room', username)
    })

    this.socket.on('add char', (chars)=> {
      this.setState({
        code: chars
      }, ()=> console.log(this.state.code))
    })
  }

  onChange(newValue, event) {
    // console.log('my new event is', event)
    // console.log('THE NEW VALUE IS:', newValue)
    this.socket.emit('typing', newValue, event)
  }

    handleSubmit() {
      let codeString = this.state.code
      // console.log('string of code submitted',codeString)
      console.log(setTimeout(codeString, 0))
    }


  render() {
    return (
      <div>
        <h1> LIVE CODING PLACEHOLDER </h1>
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

      <div> {this.state.instructions} </div>
      </div>
     )
  }
}

export default UserLiveCodingView;
