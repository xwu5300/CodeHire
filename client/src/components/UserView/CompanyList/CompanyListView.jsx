import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
    // console.log('comp list view props', this.props.company_list)
    if (this.props.company_list.length) {
      let rows = this.props.company_list.map((company) => {
        let url = company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
        return {
          id: company.id,
          logo: url,
          company: {name: company.name, information: company.information}
        }
      })
      let columns = [
        {accessor: 'logo', label: '', priorityLevel: 1, position: 1, sortable: false, CustomComponent: Image},
        {accessor: 'company', label: 'Company', priorityLevel: 2, sortable: true, position: 2, minWidth: 300, CustomComponent: CompanyDetail},
        {accessor: 'id', label: '', priorityLevel: 3, position: 3, CustomComponent: ViewCompanyPage}
      ]

      return (
        <div>
          <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
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
          <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
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