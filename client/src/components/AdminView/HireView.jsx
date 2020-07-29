import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserSearchResults from './HireView/UserSearchResults.jsx';
import SavedUsers from './HireView/SavedUsers.jsx';
import CompanyNavBar from './CompanyNavBar.jsx';


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
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
        <div className="search-container">
          <div className="ui fluid left icon action input">
            <input type="text" value={this.state.query} placeholder="Search by username or skill..." onChange={this.handleChange} onKeyPress={(e)=>{this.handleKeyPress(e)}}/>
            <i className="users icon"></i>
            <div className="ui button" onClick={this.handleClick}>Search Users</div>
          </div>
        </div>
        <div className="ui two column grid centered" style={{ marginTop: '50px'}}>
          <div className="search-results">
          <div className="ui top attached header">
            <h4 className='hire_header'>Search Results</h4> 
            </div>
            {!this.state.searched ? <div className="ui attached segment">Search users to get started.</div> :
            <div className="scroll">
              <UserSearchResults results={this.props.results} fetchResults={this.props.fetchCompanyResults} users={this.props.users} save={this.props.saveToFavorites} remove={this.props.removeFromFavorites} favorites={this.props.favorites.map((item) => item.user_id)}/> 
            </div>}
          </div>
            <div className="search-results">
              <div className="ui top attached header">
              <h4 className='hire_header'>Saved Users</h4>
            </div>
            <div className="scroll">
              <SavedUsers results={this.props.results} fetchResults={this.props.fetchCompanyResults} contact={this.props.contact} favorites={this.props.favorites} remove={this.props.removeFromFavorites}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(HireView);
