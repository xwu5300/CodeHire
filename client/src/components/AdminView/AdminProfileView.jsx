import React, { Component } from 'react';
import { connect } from "react-redux";


class AdminProfileView extends Component {
  constructor() {
    super();

    this.state = {
      logo_url: '',
      information: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchCompanyInfo(this.props.username);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.props.updateInfo(this.props.username, this.state.logo_url, this.state.information);
  }
  
  render() {
    return (
      <div className='company_profile'>
        <div className='ui centered raised padded container segment'>
          <div className='ui centered grid'>
            <h1>Company Profile</h1>
            <div className='row'>
              <img src={ this.props.logo_url } />
            </div>
            <div className='row'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.logo_url } style={{ width: '60%' }} name='logo_url' className='ui input' type='text' placeholder='Logo Url' />
              <button onClick={ () => this.handleSubmit() } type='ui button'>Save Changes</button>
            </div>
            
            <div className='row info_textarea'>
              <textarea onChange={ (e) => this.handleChange(e) } value={ this.state.information } style={{ width: '80%', height: '300px'}} name='information'>Current Info will show here</textarea>
            </div>
            <div className='row six column'>  
              <button onClick={ () => this.handleSubmit() } type='ui button'>Save Changes</button>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}


export default AdminProfileView;