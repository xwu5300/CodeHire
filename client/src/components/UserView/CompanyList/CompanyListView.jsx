import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyDetailView from './CompanyDetailView.jsx';

class CompanyListView extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.props.fetchCompanyList();
  }

  render() {
    return (
    <div>
        <div className="ui orange three item inverted menu">
        <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
        <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Live Challenges</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user/companylist2')}}>Company List</div>
        </div>
        <div>
          {this.props.company_list.map((company, i) => {
            return (
            <div key={i}> 
                <CompanyDetailView company={company}/> 
            </div>
            )
          })}
        </div>
    </div>
    )
  }
}

export default withRouter(CompanyListView);