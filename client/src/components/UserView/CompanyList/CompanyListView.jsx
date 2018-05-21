import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserNavBar from '../UserNavBar.jsx';
import CompanyListTableView from './CompanyListTableView.jsx';
import SearchCompany from './SearchCompany.jsx';
import ViewCompanyPage from './ViewCompanyPage.jsx';
import Image from './Image.jsx';
import CompanyDetail from './CompanyDetail.jsx';


class CompanyListView extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.props.fetchCompanyList('');
  }

  render() {
    console.log('comp list view props', this.props.company_list)
    if (this.props.company_list.length) {
      let rows = this.props.company_list.map((company) => {
        let url = company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
        return {
          id: company.id,
          logo: url,
          company: [company.name, company.information]
        }
      })
      let columns = [
        {accessor: 'logo', label: '', priorityLevel: 1, position: 1, CustomComponent: Image},
        {accessor: 'company', label: 'Company', priorityLevel: 2, position: 2, CustomComponent: CompanyDetail},
        {accessor: 'id', label: '', priorityLevel: 3, position: 3, CustomComponent: ViewCompanyPage}
      ]

      return (
        <div>
          <UserNavBar/>
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompany updateCompanyList={this.props.fetchCompanyList}/>
          </div>
          <CompanyListTableView rows={rows} columns={columns} />
        </div>
      )

      // return (
      // <div>
      //     <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
      //       <SearchCompany updateCompanyList={this.props.fetchCompanyList}/>
      //     </div>
      //     <div>
      //       {this.props.company_list.map((company, i) => {
      //         return (
      //         <div key={i}> 
      //             <CompanyListTableView company={company}/> 
      //         </div>
      //         )
      //       })}
      //     </div>
      // </div>
      // )
    } else {
      return (
      <div>
        <UserNavBar/>
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