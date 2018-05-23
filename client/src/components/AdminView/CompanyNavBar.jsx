import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

class CompanyNavBar extends Component {

  componentDidMount() {
      this.props.getUsername(localStorage.getItem('userId'));
  }
  
  render() {
    
  return (
      <div className="ui orange six item menu">
          <div className={this.props.history.location.pathname === '/admin/profile' ? 'ui active item' : 'ui item' } onClick={ () => {this.props.history.push('/admin/profile')} }><i className="user circle icon"></i>
          { this.props.username }</div>
          <div className={this.props.history.location.pathname === '/admin'? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/admin')}}>Dashboard</div>
          <div className={this.props.history.location.pathname === '/admin/challenges' ? 'ui active item' : 'ui item' } onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className={this.props.history.location.pathname === '/admin/data' ? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div>
          <div className={this.props.history.location.pathname === '/admin/hire' ? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div>
          <div className='ui item' onClick={() => this.props.handleLogout() }>Log Out</div>
      </div>
  )
 }
}

export default withRouter(CompanyNavBar);