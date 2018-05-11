import React, { Component } from 'react';

class UserSearchView extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(evt) {
    this.setState({
      input: evt.target.value
    })
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.input} onChange={this.updateInput} style={{width: '300px', height: '40px'}} />
        <button className='ui button' onClick={() => {
          this.props.updateCompanyCalendar(this.state.input)
          this.setState({
            input: ''
          })
        }}>
        Search Company
        </button>
      </div>
    )
  }
}

export default UserSearchView;