import React, { Component } from 'react';

import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/admin' component={AdminDashboardView}/>
        <Route exact path='/admin/profile' component={AdminProfileView}/>
        <Route exact path='/admin/challenges' component={ChallengeListView}/>
        <Route exact path='/admin/live' component={LiveCodingView}/>
        <Route exact path='/admin/data' component={AnalyticsView}/>
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
      
   }
};

const mapStateToProps = (state) => {
   return {
       
   };
};

//export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

export default AdminContainer;