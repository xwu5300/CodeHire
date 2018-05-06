import React, { Component } from 'react';

import UserInitialChallengeView from '../components/UserView/UserInitialChallengeView.jsx';
import UserLiveCodingView from '../components/UserView/UserLiveCodingView.jsx';
import UserProfileView from '../components/UserView/UserProfileView.jsx';
import CompanyListView from '../components/UserView/CompanyListView.jsx';
import CompanyScheduleView from '../components/UserView/CompanyScheduleView.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserContainer extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/user' component={CompanyListView}/>
        <Route exact path='/user/schedule' component={CompanyScheduleView}/>
        <Route exact path='/user/challenge' component={UserInitialChallengeView}/>
        <Route exact path='/user/live' component={UserLiveCodingView}/>
        <Route exact path='/user/profile' component={UserProfileView}/>
      </Switch>
    );
  }
}



const mapStateToProps = (state) => {
   return {
       
   };
};


const connectUserContainer = connect(mapStateToProps, {})(UserContainer);
export default withRouter(connectUserContainer);