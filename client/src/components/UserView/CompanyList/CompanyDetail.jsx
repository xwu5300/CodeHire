import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

class CompanyDetail extends Component {
  constructor() {
    super();

    this.state = {
      style: {
        width: '25%',
        height: '200px',
        cursor: 'pointer'
      }
    }

    this.storeCompanyInfo = this.storeCompanyInfo.bind(this)
    this.viewCompanyPage = this.viewCompanyPage.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  storeCompanyInfo(id, name) {
    let companyId = {id: id};
    let companyName = name;
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
    localStorage.setItem('companyName', companyName)
  }

  viewCompanyPage(id, name) {
    this.storeCompanyInfo(id, name)
    this.props.history.push('/user/schedule');
  }

  handleMouseOver() {
    this.setState({
      style: {
        width: '25%',
        height: '200px',
        backgroundColor: 'orange', 
        cursor: 'pointer'
      }
    })
  }

  handleMouseOut() {
    this.setState({
      style: {
        width: '25%',
        height: '200px',
        cursor: 'pointer'
      }
    })
  }
  
  render() {
    let logo = this.props.company.logo_url ? this.props.company.logo_url : 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
    let name = this.props.company.name;
    let id = this.props.company.id;
    let style = this.state.style;
    return (

    <div 
      onMouseOver={ this.handleMouseOver } 
      onMouseOut={ this.handleMouseOut }  
      onClick={() => this.viewCompanyPage(id, name)  } 
      className='ui card company_card' style={style}
    >
      <img src={ logo } style={{ width: '100px', height: 'auto'}}/>
      <div className='company-name'>
        { name }
      </div>
    </div>
    )
  }
}

export default withRouter(CompanyDetail);