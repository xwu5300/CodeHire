import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

class CompanyView extends Component {
  constructor() {
    super()

    this.encodeCompanyId = this.encodeCompanyId.bind(this);
  }

  encodeCompanyId(id) {
    let companyId = {id: id};
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
  }
  
  render() {
    return(
    <div>
      <div>{this.props.company.logo_url}</div>
      <div>Name: {this.props.company.name}</div>
      <div>Information: {this.props.company.information}</div>
      <div>Phone: {this.props.company.phone}</div>
      <button onClick={() => {
        this.encodeCompanyId(this.props.company.id)
        this.props.history.push('/user/schedule');
        }}>View Company Page
      </button>
    </div>
  )}
}

export default withRouter(CompanyView);