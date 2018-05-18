import React, { Component } from 'react';


class ScheduleChallengeView extends Component {
  constructor(props){
    super(props);
    this.state = {
      duration: '',
      invalid: this.props.challenges.map((item) => false),
      isSelected: null,
      currentlyOn: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.toggleValid = this.toggleValid.bind(this);
    this.toggleCurrentlyOn = this.toggleCurrentlyOn.bind(this);
  }

  componentDidMount() {
    if(this.props.initialChallenge[0]) {
      this.setState({ isSelected: this.props.initialChallenge[0].id })
    }
  }

  handleClick(challenge, challengeId, i) {
    let date = $('#date').val();
    if (this.props.isInitial) {
      if (this.state.duration === '') {
        this.setState({
          isSelected: challengeId
        }, () => {
          this.toggleValid(i);
        })
      } else {
        this.props.makeInitial(challenge.id, challenge.initial, this.state.duration, this.props.isInitial, this.props.userId, this.props.close);
      }
    }
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

   toggleValid(i) {
    let newValidity = [...this.state.invalid];
    newValidity[i] = true;
    this.setState({
      invalid: newValidity
    })
  }

  toggleCurrentlyOn(id) {
    this.setState({
      // duration: '',
      currentlyOn: id
    })
  }


  render() {

    const selected = {
      border: '3px solid orange',
      width: '45%',
      height: '200px'
    }

    const notSelected = {
       width: '45%',
       height: '200px'
    }

    return (
      <div>
        <h4>Select from your saved challenges:</h4>
        <div className='ui cards'>
          {this.props.challenges.length === 0 ? 'No saved challenges to choose from' : this.props.challenges.map((item, i) => {
            return (
              <div className='ui card' style={ this.state.isSelected === item.id ? selected : notSelected } key={ item.id }>
                <div className='content'>
                  <div className="title"><b>{item.title}</b></div>
                    <div className='description'>
                      <b>Description:</b> {item.instruction}
                      <br />
                      <br />
                      <b>Difficult:</b> {item.difficulty}
                    </div>
                  <div className="field dropdown" style={{ position: 'absolute', top: '3px', right: '3px' }} onClick={() => {this.toggleCurrentlyOn(item.id)}}>
                    <select className="ui dropdown" name="duration" value={this.state.currentlyOn === item.id ? this.state.duration : ""} onChange={this.handleDurationChange}>
                      <option value="">Duration (minutes)</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div>
                </div>
                {this.state.invalid[i] ? <div style={{color: 'red'}}>Please select a duration</div> : null}
                <div className="ui bottom attached button" onClick={ () => this.handleClick(item, item.id, i) }>Select</div>
              </div>
            )
          })}
        </div>
      </div>
      )}
    }


export default ScheduleChallengeView;
