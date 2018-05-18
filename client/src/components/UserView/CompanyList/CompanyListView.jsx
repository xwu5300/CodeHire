import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyDetailView from './CompanyDetailView.jsx';
import SearchCompany from './SearchCompany.jsx';

class CompanyListView extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.props.fetchCompanyList('');
  }

  render() {
    // console.log('comp list view props', this.props)
    return (
    <div>
        <div className="ui orange four item menu">
        <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
        <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>

        <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompany updateCompanyList={this.props.fetchCompanyList}/>
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