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

    this.socket.on('add char-' + this.props.userIndex, (chars)=> {
      this.setState({
        code: chars
      }, ()=> console.log(this.state.code))
    })
  }


  render() {
    console.log('INDEEXXXX', 'add char-' + this.props.userIndex);
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="codehire"
          onLoad={this.onLoad}
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
      </div>
     )
  }
}

export default Editor;