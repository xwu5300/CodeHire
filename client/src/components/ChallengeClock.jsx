import React, { Component } from 'react';
import socketClient from 'socket.io-client';

class ChallengeClock extends Component {

  constructor() {
    super();

    this.state = {
      minutes: '',
      seconds: '',
      time_running: false
    }

    this.startChallenge = this.startChallenge.bind(this);
    this.onReset = this.onReset.bind(this);

    this.socket = socketClient();

    this.socket.on('show time_limit', (minutes, seconds) => {
      this.setState({ minutes: minutes, seconds: seconds });
    })

    this.socket.on('clock was reset', (duration) => {
      this.setState({ minutes: this.props.duration, seconds: '00' })
    })
  }

  componentDidMount() {
    if(this.state.minutes === '') { 
      this.setState({ minutes: this.props.duration, seconds: '00' });
    }
  }

  startChallenge() {
    this.setState({ time_running: true })
    this.socket.emit('send time_limit', this.props.duration);
  }



  onReset() {
    this.socket.emit('reset clock');
  }


  render() {
    return (
      <div>
        <div className='live_coding_clock'> Time Limit: { this.state.minutes + ':' + this.state.seconds }</div>
        <button className='time_limit_btn ui green button' style={{marginTop: '10px'}} onClick={ () => this.startChallenge() }> Start Challenge </button>
        <button className='time_limit_btn ui orange button' style={{marginTop: '10px'}}onClick={ () => this.onReset() }>Reset Clock</button>
      </div>  
    )
  }
}

export default ChallengeClock;