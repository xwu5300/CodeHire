import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserSearchResults from './HireView/UserSearchResults.jsx';
import SavedUsers from './HireView/SavedUsers.jsx';


class HireView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searched: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getFavorites(localStorage.getItem('userId'));
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleClick() {
    this.props.searchUsers(this.state.query, () => {
      this.setState({
        query: '',
        searched: true
      })
    })
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleClick();
    }
  }


  render() {
    return(
      <div>
        <div className="ui orange five item menu">
          <div className='ui item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
          <div className='ui active item cursor' onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div> 
        </div>
       
        <div className="search-container">
          <div className="ui fluid left icon input">
            <input type="text" value={this.state.query} placeholder="Search by username or skill..." onChange={this.handleChange} onKeyPress={(e)=>{this.handleKeyPress(e)}}/>
            <i className="users icon"></i>
            <div className="ui button" onClick={this.handleClick}>Search</div>
          </div>
        </div>

        <div className="search-results-container">
          <div className="search-results">
           <h4>Search Results</h4> 
           <UserSearchResults users={this.props.users} save={this.props.saveToFavorites} searched={this.state.searched}/>
          </div>
          <div className="search-results">
            <h4>Saved Users</h4>
            <SavedUsers favorites={this.props.favorites} remove={this.props.removeFromFavorites}/>
          </div>
        </div>

      </div>
    )
  }
}


export default withRouter(HireView);
