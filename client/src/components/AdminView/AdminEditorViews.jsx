import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import UserProfile from './UserProfile.jsx';


import 'brace/mode/javascript';
import 'brace/theme/monokai';

class AdminEditorViews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      userCode: [],
      title: 'greeting',
      params: 'param strings',
      instructions: `Instructions: buffalo buffalo buffalo buffalo buffalo buffalo`,
      code: `function placeholder(params) {

}` }

    this.socket = socketClient();
    
    this.socket.on('add character', (username, chars)=> {

        this.setState({
          userCode: [username, chars]
        })

      if(this.props.active_user === username) {
        this.setState({
          code: chars
        })
      }
    })
  }

    componentWillUnmount() {
    this.socket.emit('save localStorage')
    var old = {}
    if (localStorage.getItem('user_code')) {
       old = JSON.parse(localStorage.getItem('user_code'))
    } 
    for (var key in old) {
      if (key === this.state.userCode[0]) {
        old[key] = this.state.userCode[1]
      } 
    }

    old[this.state.userCode[0]] = this.state.userCode[1]

    localStorage.setItem('user_code', JSON.stringify(old));
  }

  componentDidMount() {

    let user_code = JSON.parse(localStorage.getItem('user_code'));

    console.log('STATATATTAE', user_code, this.props.active_user);

    this.setState({ code: user_code[this.props.active_user] })
  }


  render() {
    
    if(this.state.result === true) {
      var result = localStorage.getItem('username') + ' Passed Challenge';
    } else if(this.state.result === false) {
      result = localStorage.getItem('username') + ' Failed Challenge';
    }
    
    return (
      <div className='ui segment'>
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="codehire"
            onLoad={this.onLoad}
            fontSize={14}
            height='600px'
            width='600px'
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            editorProps={{$blockScrolling: Infinity}}
            value={this.state.code}
            setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}/>

        { this.state.result !== null ? <div className='live_result_container'>{ result }</div> : null } 
      </div>
     )
  }
}

export default AdminEditorViews;