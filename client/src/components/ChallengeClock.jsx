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
    this.onTick = this.onTick.bind(this);
    this.onReset = this.onReset.bind(this);

    this.socket = socketClient();

    this.socket.on('show time_limit', (minutes, seconds) => {
      this.setState({ minutes: minutes, seconds: seconds });
    })
  }

  componentDidMount() {
    if(this.state.minutes === '') { 
      this.setState({ minutes: this.props.duration, seconds: '00' });
    }
  }

  startChallenge() {
    this.setState({ time_running: true })
    this.onTickCount = setInterval(this.onTick, 125);
  }


  onTick() {

    this.socket.emit('send time_limit', this.state.minutes, this.state.seconds);

    if(this.state.time_running) {
      this.setState({ seconds: this.state.seconds - 1 });
    }

    if(this.state.seconds === -1){
      this.setState({
        seconds: 60,
        minutes: this.state.minutes - 1,
      });
    }
  }

  onReset() {
    clearInterval(this.onTick);
    this.setState({ minutes: this.props.duration, seconds: '00', time_running: false })
  }

  componentWillUnmount() {
    clearInterval(this.onTickCount);
  }

  render() {
    return (
      <div>
        <div className='live_coding_clock'> Time Limit: { this.state.minutes + ':' + this.state.seconds }</div>
        <button className='time_limit_btn' type='button' onClick={ () => this.startChallenge() }> Start Challenge </button>
        <button className='time_limit_btn' type='button' onClick={ () => this.onReset() }>Reset Clock</button>
      </div>  
    )
  }
}

export default ChallengeClock;