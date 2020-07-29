import React, { Component } from 'react';

class SearchCompanySchedule extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  updateInput(evt) {
    this.setState({
      input: evt.target.value
    })
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.props.updateCompanyCalendar(this.state.input)
      this.setState({
        input: ''
      })
    }
  }

  render() {
    return (
      <div>
        <div className="ui action input">
          <input type='text' value={this.state.input} onChange={this.updateInput} style={{width: '300px', height: '40px'}} onKeyPress={(e)=>{this.handleKeyPress(e)}} placeholder="Search..." />
          <button className='ui button' onClick={() => {
            this.props.updateCompanyCalendar(this.state.input)
            this.setState({
              input: ''
            })
          }}>
          Search Company
          </button>
        </div>
      </div>
    )
  }
}

export default SearchCompanySchedule;