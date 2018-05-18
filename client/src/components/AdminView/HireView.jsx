import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class HireView extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div>
        <div className="ui orange five item inverted menu">
          <div className='ui item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
          <div className='ui active item cursor' onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div> 
        </div>
       
        <div className="search-container">
          <div className="ui fluid left icon input">
            <input type="text" placeholder="Search users by username or skill..."/>
            <i className="users icon"></i>
            <div className="ui button">Search</div>
          </div>
        </div>

      </div>
    )
  }
}


export default HireView;