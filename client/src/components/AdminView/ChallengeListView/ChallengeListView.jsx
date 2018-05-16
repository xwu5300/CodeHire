import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import Modal from 'react-modal';

import SavedChallenges from './dragndropComponents/SavedChallenges.jsx';
import DefaultChallenges from './dragndropComponents/DefaultChallenges.jsx';
import ScheduledChallenges from './dragndropComponents/ScheduledChallenges.jsx';

import ChallengeCard from './dragndropComponents/ChallengeCard.jsx';
import Form from './Form.jsx';
import { getChallengeInfo } from '../../../actions/adminActions';

/* ------- Drag N Drop ------- */
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
    this.props.fetchDefaultChallenges();
    this.props.fetchCompanySchedule(localStorage.getItem('userId'));
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
        <div className="ui orange four item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui active item' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
        </div>

        <div className='challenge_list'>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
              <Form save={this.props.saveChallenge} close={this.closeModal} history={this.props.history} userId={localStorage.getItem('userId')}/>
            </Modal>
          <div className='ui padded horizontal segments challenge_list'>

          <SavedChallenges  getChallengeId={ this.props.getChallengeId } openModal={ this.openModal } userId={localStorage.getItem('userId')} allChallenges={this.props.all_challenges} delete={this.props.deleteChallenge} addToCompanySchedule={this.props.addToCompanySchedule} isInitial={this.props.is_initial} makeInitial={this.props.makeInitial} getInfo={this.props.getChallengeInfo} challengeInfo={this.props.challenge_info} save={this.props.saveChallenge}/>
          <DefaultChallenges userId={localStorage.getItem('userId')} defaultChallenges={this.props.default_challenges} save={this.props.saveChallenge}/>
          <ScheduledChallenges userId={localStorage.getItem('userId')} updateChallengeDate={ this.props.updateChallengeDate } deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule } scheduledChallenges={ this.props.company_schedule } allChallenges={ this.props.all_challenges } addToCompanySchedule={ this.props.addToCompanySchedule } />
        </div>
      </div>
    </div>
    )
  }
}

  


export default withRouter(ChallengeListView);



          