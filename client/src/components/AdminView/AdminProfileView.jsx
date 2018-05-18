import React, { Component } from 'react';
import { connect } from "react-redux";


class AdminProfileView extends Component {
  constructor() {
    super();

    this.state = {
      logo_url: 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w',
      information: 'Insert company information here',
      isTextarea: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanyInfo(localStorage.getItem('userId'), () => {

      if(this.props.logo_url) {
        this.setState({ logo_url: this.props.logo_url });
      }

      if(this.props.company_information) {
        this.setState({ information: this.props.company_information })
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.props.updateInfo(localStorage.getItem('userId'), this.state.logo_url, this.state.information);
  }

  toggleInfo() {
    this.setState({ isTextarea: !this.state.isTextarea })
  }
  
  render() {
    return (
      <div>
        <div className="ui orange five item inverted menu">
          <div className='ui active item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div> 
        </div>
        
        <div className='company_profile_container'>
        <div className='ui raised container horizontal segments'>

          <div className='ui segment' style={{ width: '60%' }}>
            <h2> About {this.props.token} </h2>
            <i style={{ fontSize: '26px' }} onClick={ () => this.toggleInfo() } className="pencil alternate icon edit_company_info"></i>
            {this.state.isTextarea ?
               <textarea onChange={ (e) => this.handleChange(e) } value={ this.state.information } className='company_profile_textarea' name='information'>{ this.state.information }</textarea>
               :
               <div className='company_profile_textarea' name='information'>{ this.state.information }</div>
            }
            
          </div>

          <div className='ui segment'>
            <img className='company_profile_logo' src={ this.state.logo_url } />
            <input onChange={ (e) => this.handleChange(e) } value={ this.state.logo_url } name='logo_url' className='ui input logo_input' type='text' placeholder='Logo Url' />
          </div> 

        </div>
        <button onClick={ () => this.handleSubmit() } style={{ display: 'block', margin: 'auto', width: '200px' }} className='ui orange inverted button'>Save Changes</button> 
        </div>
      </div>
    )
  }
}


export default AdminProfileView;