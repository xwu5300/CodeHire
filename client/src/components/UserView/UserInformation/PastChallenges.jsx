import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class PastChallenges extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <div className="ui orange three item inverted menu">
        <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
        <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Live Challenges</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user/companylist2')}}>Company List</div>
        </div>
      </div>
    )
  }
}

export default PastChallenges;
