import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';

class UserNavBar extends Component {


  componentDidMount() {
      this.props.getUsername(localStorage.getItem('userId'));
  }

  render() {
   return (
      <div className="ui orange five item menu user_navbar">
          <div className={this.props.history.location.pathname === '/user/profile' ? 'ui active item' : 'ui item' } onClick={ () => {this.props.history.push('/user/profile')} }><i className="user circle icon"></i>
          { this.props.username }</div>
          <div className={this.props.history.location.pathname === '/user'? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className={this.props.history.location.pathname === '/user/challengelist' ? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className={this.props.history.location.pathname === '/user/companylist' ? 'ui active item' : 'ui item' } onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
           <div className='ui item' onClick={() => this.props.handleLogout() }>Log Out</div>
      </div>
  )
 }
}

export default withRouter(UserNavBar);