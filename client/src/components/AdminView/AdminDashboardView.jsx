import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import ScheduleChallengeView from './ScheduleChallengeView.jsx';

class AdminDashboardView extends Component {
  constructor(props) {
    super(props);

    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
    this.viewChallenge = this.viewChallenge.bind(this);
    this.showModal = this.showModal.bind(this);
  }


  componentDidMount() {
    this.props.fetchCompanySchedule(this.props.user_id);
    console.log(this.props)
  }

  handleClickOn() {
    // this.showModal();
    this.props.toggleInitialOn();
    this.props.history.push('/admin/challenges');
  }

  handleClickOff() {
    this.props.toggleInitialOff();
    this.props.history.push('/admin/challenges');
  }

  viewChallenge(title, companyId, duration) {
    this.props.setCurrentLiveChallenge(title, duration);
    this.props.currentCompanyCalendar(companyId, () => {
      this.props.history.push('/admin/live')
    });
  }

  showModal() {
    $('.ui.modal')
    .modal({
      centered: true
    })
    .modal('show')
  }

  render() {

    return (
      <div className='admin_dashboard'>
        <div className='ui raised padded centered container segment'>
          <div className='ui grid'>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/profile')}}>Edit Profile</button>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/data')}}>View Analytics</button>
            <button className='ui button' type='button' onClick={() => {this.handleClickOff()}}>Edit Challenges</button>
            <div className='row centered challenge_btns'>
              <button className='ui button' type='button' onClick={this.handleClickOn}>Set Initial Challenge</button>
              <button className='ui button' type='button' onClick={this.handleClickOff}>Schedule Challenge</button>
            </div>
            <div className="ui modal">
              <i className="close icon"></i>
              <div className="scrolling content">
              <ScheduleChallengeView challenges={this.props.all_challenges}/>
              </div>
            </div>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Initial Challenge</th>
                </tr>
              </thead>
              <tbody>
                {this.props.initial_challenge.length === 0 ? null :
                  <tr>
                    <td>{this.props.initial_challenge[0].title}</td>
                    <td><button className='ui button' type='button' onClick={() => {this.props.makeInitial(this.props.initial_challenge[0].id, this.props.initial_challenge[0].initial)}}><i className='x icon'></i></button></td>
                  </tr>
                }
              </tbody>
            </table>
            <br/>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Scheduled Challenge</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.props.company_schedule ? this.props.company_schedule.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{moment(item.time).format('MMMM Do YYYY, h:mm A')}</td>
                    <td>{item.duration}</td>
                    <td><button className='ui button' type='button' onClick={() => { this.viewChallenge(item.title, item.company_id, item.duration) }}>View challenge</button></td>
                    <td><button className='ui button' type='button' onClick={()=>{this.props.deleteFromCompanySchedule(item.id)}}><i className='x icon'></i></button></td>
                  </tr>
                )
              }) : null }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}


export default withRouter(AdminDashboardView);
