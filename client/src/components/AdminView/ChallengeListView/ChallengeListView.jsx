import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import Modal from 'react-modal';

import SavedChallenges from './dragndropComponents/SavedChallenges.jsx';
import DefaultChallenges from './dragndropComponents/DefaultChallenges.jsx';
import ScheduledChallenges from './dragndropComponents/ScheduledChallenges.jsx';
import CompanyNavBar from '../CompanyNavBar.jsx';

import ChallengeCard from './dragndropComponents/ChallengeCard.jsx';
import Form from './Form.jsx';
import { getChallengeInfo } from '../../../actions/adminActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)


class ChallengeListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    this.props.fetchActiveChallenges(localStorage.getItem('userId'));
    this.props.fetchDefaultChallenges();
    this.props.fetchCompanySchedule(localStorage.getItem('userId'));
    this.props.fetchInitialChallenge(localStorage.getItem('userId'));
    Modal.setAppElement('body');

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
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
       
        <div className='challenge_list'>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <Form save={this.props.saveChallenge} close={this.closeModal} history={this.props.history} userId={localStorage.getItem('userId')}/>
          </Modal>
           <button style={{ display: 'block', margin: 'auto', marginBottom: '50px' }} className="input_challenge_btn ui centered orange button" onClick={ this.openModal }>Create new challenge</button>
          <div className='ui padded raised horizontal segments challenge_list'>
          <DefaultChallenges userId={localStorage.getItem('userId')} defaultChallenges={this.props.default_challenges} save={this.props.saveChallenge} getInfo={this.props.getChallengeInfo} />
          <SavedChallenges  getChallengeId={ this.props.getChallengeId } openModal={ this.openModal } userId={localStorage.getItem('userId')} activeChallenges={this.props.active_challenges} delete={this.props.deleteChallenge} addToCompanySchedule={this.props.addToCompanySchedule} isInitial={this.props.is_initial} makeInitial={this.props.makeInitial} getInfo={this.props.getChallengeInfo} challengeInfo={this.props.challenge_info} save={this.props.saveChallenge} fetchActiveChallenges={this.props.fetchActiveChallenges}/>
          <ScheduledChallenges initialChallenge={this.props.initial_challenge} getSchedule={this.props.fetchCompanySchedule} userId={localStorage.getItem('userId')} updateChallengeDate={ this.props.updateChallengeDate } deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule } scheduledChallenges={ this.props.company_schedule } addToCompanySchedule={ this.props.addToCompanySchedule } />
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(ChallengeListView);



          