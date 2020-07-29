import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchCompany from './SearchCompany.jsx';
import Image from './Image.jsx';
import CompanyDetail from './CompanyDetail.jsx';

import UserNavBar from '../UserNavBar.jsx';


class CompanyListView extends Component {
  constructor() {
    super();

    this.state = {
      indexHovered: null
    }

    this.handleHover = this.handleHover.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchCompanyList('');
  }

  handleHover(name) {
    
    if(name === 'mouseOut') {
      this.setState({
        indexHovered: null
      })
    }

    this.setState({
      indexHovered: name
    })
  }

  render() { 
      return (
        <div>
          <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompany updateCompanyList={this.props.fetchCompanyList} />
          </div>
          <div className='ui cards centered grid' style={{ marginBottom: '40px'}}>
            {this.props.company_list.length > 0 ? this.props.company_list.map((company, i) => {
              return (
                <CompanyDetail key={ i } id={ company.id } handleHover={ this.handleHover } indexHovered={ this.state.indexHovered } logo={ company.logo_url ? company.logo_url : 'http://dev.jobkhoji.com/assets/images/default_company_icon.png'  } 
                               name={ company.name } fetchCompanyInfo={ this.props.fetchCompanyInfo } fetchCandidateInitialResults={this.props.fetchCandidateInitialResults}
                               
                />              
              );
            }) : <div style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Sorry, we weren't able to find any results.</div>}
            </div>
         </div>
      )

    } 
 }

export default withRouter(CompanyListView);