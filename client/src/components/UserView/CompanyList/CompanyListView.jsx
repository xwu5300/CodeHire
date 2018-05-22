import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyListTableView from './CompanyListTableView.jsx';
import SearchCompany from './SearchCompany.jsx';
import ViewCompanyPage from './ViewCompanyPage.jsx';
import Image from './Image.jsx';
import CompanyDetail from './CompanyDetail.jsx';

import UserNavBar from '../UserNavBar.jsx';


class CompanyListView extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.props.fetchCompanyList('');
  }

  render() {
    // console.log('comp list view props', this.props.company_list)
    if (this.props.company_list.length) {
      let rows = this.props.company_list.map((company) => {
        let url = company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
        return {
          info: {companyId: company.id, companyName: company.name, companyInformation: company.information},
          logo: url,
          company: {name: company.name, information: company.information}
        }
      })
      let columns = [
        {accessor: 'logo', label: '', priorityLevel: 1, position: 1, sortable: false, CustomComponent: Image},
        {accessor: 'company', label: 'Company', priorityLevel: 2, sortable: true, position: 2, minWidth: 300, CustomComponent: CompanyDetail},
        {accessor: 'info', label: '', priorityLevel: 3, position: 3, CustomComponent: ViewCompanyPage}
      ]

      return (
        <div>
          <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompany updateCompanyList={this.props.fetchCompanyList}/>
          </div>
          <CompanyListTableView rows={rows} columns={columns} />
        </div>
      )

    } else {
      return (
      <div>
          <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
          <SearchCompany updateCompanyList={this.props.fetchCompanyList}/>
        </div>
        <div>Sorry, we weren't able to find any results</div>
      </div>
      )
    }
  }
}

export default withRouter(CompanyListView);