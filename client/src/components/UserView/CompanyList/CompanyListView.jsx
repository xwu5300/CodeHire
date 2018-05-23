import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchCompany from './SearchCompany.jsx';
import ViewCompanyPage from './ViewCompanyPage.jsx';
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
    console.log('comp list view props', this.props)
    return (
      <div>
        <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
          <SearchCompany updateCompanyList={this.props.fetchCompanyList} />
        </div>
        <div className='ui cards centered grid'>
          {this.props.company_list ? this.props.company_list.map((company, i) => {
            return (
              <CompanyDetail key={ i } company={company}/>              
            );
          }) : "Sorry, we weren't able to find any results" }
          </div>
      </div>
    )

    } 
 }

export default withRouter(CompanyListView);