import React, { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import { withRouter } from 'react-router-dom';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

class CompanyView extends Component {
  constructor() {
    super()

    this.encodeCompanyId = this.encodeCompanyId.bind(this)
    this.viewCompanyPage = this.viewCompanyPage.bind(this);
  }

  encodeCompanyId(id) {
    let companyId = {id: id};
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
  }

  viewCompanyPage(id) {
    this.encodeCompanyId(id)
    this.props.history.push('/user/schedule');
  }

  render() {
    return (
      <div className='ui container segment'>
        <ReactCollapsingTable 
        columns={this.props.columns} 
        rows={this.props.rows} 
        rowSize={5} 
        // showSearch={ true }
        showPagination={ true }
        callbacks={{'id': this.viewCompanyPage}}
      />
      </div>
    )
  }
}

export default withRouter(CompanyView);