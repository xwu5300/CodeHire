import React, { Component } from 'react';

import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import AdminDropbox from './AdminDropBox.jsx';


class AdminProfileView extends Component {
  constructor() {
    super();

    this.state = {
      logo_url: 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w',
      information: 'Insert company information here',
      isTextarea: false,
      website_url: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanyInfo(localStorage.getItem('userId'), () => {

      if(this.props.logo_url) {
        this.setState({ logo_url: this.props.logo_url });
      }

      if(this.props.company_information) {
        this.setState({ information: this.props.company_information })
      }
      
      if(this.props.website_url) {
        this.setState({ website_url: this.props.website_url })
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(logo) {
    let url = this.state.website_url.includes('http://') || this.state.website_url.includes('https://') ? this.state.website_url : 'http://' + this.state.website_url
    this.props.updateInfo(localStorage.getItem('userId'), logo, this.state.information, url, this.updateState);
    this.setState({ isTextarea: false })
  }

  toggleInfo() {
    this.setState({ isTextarea: !this.state.isTextarea })
  }

  updateState() {
    this.setState({
      information: this.props.company_information,
      logo_url: this.props.logo_url,
      website_url: this.props.website_url
    })
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleSubmit(this.state.logo_url);
    }
  }
  
  render() {
    return (
      <div>
        <CompanyNavBar getUsername={ this.props.getUsername} username={ this.props.username } handleLogout={ this.props.handleLogout } />
        <div className='company_profile_container'>
        <div className='ui raised container horizontal segments'>

          <div className='ui segment' style={{ width: '50%' }}>
            <h2> About {this.props.token} </h2>
            <i style={{ fontSize: '24px' }} onClick={ () => this.toggleInfo() } className="pencil alternate orange icon edit_company_info cursor"></i>
            {this.state.isTextarea ?
               <textarea onChange={ (e) => this.handleChange(e) } value={ this.state.information } className='company_profile_textarea' name='information'>{ this.state.information }</textarea>
               :
               <div className='company_profile_textarea' name='information'>{ this.state.information }</div>
            }
          </div>
          <div className='ui segment'>
            <img className='company_profile_logo' src={ this.props.logo_url } />
            <AdminDropbox submit={this.handleSubmit}/>
            <div class="ui labeled input profile">
              <div class="ui label">
                http://
              </div>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.website_url } name='website_url' className='ui input website_input' type='text' placeholder="mysite.com" onKeyPress={(evt) => {this.handleKeyPress(evt)}} />
            </div>
          </div> 
        </div>
        <button onClick={ () => this.handleSubmit(this.state.logo_url) } style={{ display: 'block', margin: 'auto', width: '200px' }} className='ui orange button'>Save Changes</button> 
        </div>
      </div>
    )
  }
}


export default AdminProfileView;