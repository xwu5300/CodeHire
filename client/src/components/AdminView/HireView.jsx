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
    console.log(this.props)
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
        <div className="search-results-container">
          <div className="search-results">
           <h4>Search Results</h4> 
           {!this.state.searched ? null :
           <UserSearchResults results={this.props.results} fetchResults={this.props.fetchCompanyResults} users={this.props.users} save={this.props.saveToFavorites} remove={this.props.removeFromFavorites} favorites={this.props.favorites.map((item) => item.user_id)}/> }
          </div>
          <div className="search-results">
            <h4>Saved Users</h4>
            <SavedUsers results={this.props.results} fetchResults={this.props.fetchCompanyResults} contact={this.props.contact} favorites={this.props.favorites} remove={this.props.removeFromFavorites}/>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(HireView);
