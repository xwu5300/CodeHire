import React, { Component } from 'react';

class SearchCompany extends Component {
  constructor() {
    super()

    this.state = {
      input: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(evt) {
    this.setState({
      input: evt.target.value
    })
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.props.updateCompanyList(this.state.input)
      this.setState({
        input: ''
      })
    }
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.input} onChange={this.updateInput} style={{width: '300px', height: '40px'}} onKeyPress={(e) => {this.handleKeyPress(e)}} />
        <button className='ui button' onClick={() => {
          this.props.updateCompanyList(this.state.input)
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

export default SearchCompany;