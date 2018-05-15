import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ScheduleChallengeView from './ScheduleChallengeView.jsx';
import Modal from 'react-modal';

class AdminDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      username: ''
    }

    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
    this.viewChallenge = this.viewChallenge.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editChallenges = this.editChallenges.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }


  componentDidMount() {
    this.props.fetchCompanySchedule(localStorage.getItem('userId'));
    this.props.fetchInitialChallenge(localStorage.getItem('userId'));
    // this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    // this.getUsername();
    Modal.setAppElement('body');
    console.log(this.props)
  }

  getUsername() {
    this.props.getUsername(localStorage.getItem('userId'), (user) => {
      this.setState({
        username: user
      })
    })
  }

  handleClickOn() {
    this.props.toggleInitialOn();
    this.openModal();
  }

  handleClickOff() {
    this.props.toggleInitialOff();
    this.openModal();
  }

  editChallenges() {
    this.props.toggleInitialOff();
    this.props.history.push('/admin/challenges');
  }

  viewChallenge(title, companyId, duration) {
    this.props.setCurrentLiveChallenge(title, duration);
    this.props.currentCompanyCalendar(companyId, () => {
      this.props.history.push('/admin/live')
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    return (
      <div>
        <div className="ui orange four item inverted menu">
          <div className='ui item cursor' onClick={() => { this.props.history.push('/admin/profile') }}><i className="user circle icon"></i>Profile</div>
          <div className='ui active item cursor' onClick={() => { this.props.history.push('/admin') }}>Dashboard</div>
          <div className='ui item cursor' onClick={() => this.editChallenges()}>Edit Challenges</div>
          <div className='ui item cursor' onClick={() => { this.props.history.push('/admin/data') }}>Analytics</div>
        </div>

        <div className='ui raised padded centered container segment'>
          <div className='ui grid'>

            <div className='row centered challenge_btns'>
              <button className='ui button cursor' type='button' onClick={this.handleClickOn}>Set Initial Challenge</button>
              <button className='ui button cursor' type='button' onClick={this.handleClickOff}>Schedule Challenge</button>
            </div>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
              <ScheduleChallengeView userId={localStorage.getItem('userId')} challenges={this.props.all_challenges} close={this.closeModal} makeInitial={this.props.makeInitial} isInitial={this.props.is_initial} addToSchedule={this.props.addToCompanySchedule} />
            </Modal>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Initial Challenge</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {this.props.initial_challenge.length === 0 ? null :
                  <tr>
                    <td>{this.props.initial_challenge[0].title}</td>
                    <td>{this.props.initial_challenge[0].duration}</td>
                    <td><button className='ui button' type='button' onClick={() => { this.props.makeInitial(this.props.initial_challenge[0].id, this.props.initial_challenge[0].initial, null, null, localStorage.getItem('userId')) }}><i className='x icon'></i></button></td>
                  </tr>
                }
              </tbody>
            </table>
            <br />
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
                {this.props.company_schedule.length > 0 ? this.props.company_schedule.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{moment(item.time).format('MMMM Do YYYY, h:mm A')}</td>
                      <td>{item.duration}</td>
                      <td><button className='ui button' type='button' onClick={() => { this.viewChallenge(item.title, item.company_id, item.duration) }}>View challenge</button></td>
                      <td><button className='ui button' type='button' onClick={() => { this.props.deleteFromCompanySchedule(item.id, localStorage.getItem('userId')) }}><i className='x icon'></i></button></td>
                    </tr>
                  )
                }) : <tr><td>You have no scheduled challenges at this time.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }

}


export default withRouter(AdminDashboardView);
