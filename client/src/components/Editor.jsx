import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'greeting',
      params: 'param strings',
      instructions: `Instructions: buffalo buffalo buffalo buffalo buffalo buffalo`,
      code: `function placeholder(params) {

}` }

    this.socket = socketClient();

    this.onChange = this.onChange.bind(this)

    this.socket.on('add char', (chars)=> {
      this.setState({
        code: chars
      }, ()=> console.log(this.state.code))
    })
  }

  onChange(newValue, event) {
    this.socket.emit('typing', newValue, event)
  }


  render() {
    return (
      <div>
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

      <div> {this.state.instructions} </div>
      </div>
     )
  }
}

export default Editor;