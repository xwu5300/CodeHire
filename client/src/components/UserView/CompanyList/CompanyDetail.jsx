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
    this.props.fetchCandidateInitialResults(idToken, localStorage.getItem('userId'), () => {})
    this.props.fetchCompanyInfo(idToken, ()=>{})
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
        border: '5px solid #f2711c', 
        color: '#f2711c',
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
    return (

    <div 
      onMouseOver={ this.handleMouseOver } 
      onMouseOut={ this.handleMouseOut }  
      onClick={() => this.viewCompanyPage(this.props.id, this.props.name)  } 
      className='ui card' style={this.state.style}
    >
      <img src={ this.props.logo } style={{ width: '100px', height: 'auto'}}/>
      <div className='company-name'>
        { this.props.name }
      </div>
    </div>
    )
  }
}

export default withRouter(CompanyDetail);