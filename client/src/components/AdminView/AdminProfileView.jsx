import React, { Component } from 'react';
import { connect } from "react-redux";


class AdminProfileView extends Component {
  constructor() {
    super();

    this.state = {
      logo_url: '',
      information: '',
      isTextarea: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  componentWillMount() {
    this.props.fetchCompanyInfo(this.props.username, () => {
      this.setState({ logo_url: this.props.logo_url, information: this.props.company_information })
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.props.updateInfo(this.props.username, this.state.logo_url, this.state.information);
  }

  toggleInfo() {
    this.setState({ isTextarea: !this.state.isTextarea })
  }
  
  render() {
    return (
      <div>
        <div className="ui orange four item inverted menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui item' onClick={() => this.props.history.push('/admin/challenges') }>Edit Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
        </div>
        
        <div className='company_profile_container'>
        <div className='ui raised container horizontal segments'>

          <div className='ui segment' style={{ width: '60%' }}>
            <h2> About {this.props.username} </h2>
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