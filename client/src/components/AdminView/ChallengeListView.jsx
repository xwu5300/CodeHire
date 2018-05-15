import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import Modal from 'react-modal';
import CompanyChallenges from './ChallengeListView/CompanyChallenges.jsx';
import DefaultChallenges from './ChallengeListView/DefaultChallenges.jsx';
import Form from './ChallengeListView/Form.jsx';
import { getChallengeInfo } from '../../actions/adminActions';



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
    console.log(this.props)
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
          <div className='ui item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>Profile</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div> 
          <div className='ui active item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Edit Challenges</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div> 
        </div>

        <button className="ui button home" onClick={() => {this.props.history.push('/admin')}}>Back to Home</button>
        <div className='challenge_list'>
          <button className="ui button" onClick={this.openModal}>Input new challenge</button>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
              <Form save={this.props.saveChallenge} close={this.closeModal} history={this.props.history} userId={localStorage.getItem('userId')}/>
            </Modal>
          <div className='ui padded horizontal segments challenge_list'>
          <CompanyChallenges userId={localStorage.getItem('userId')} allChallenges={this.props.all_challenges} delete={this.props.deleteChallenge} addToSchedule={this.props.addToCompanySchedule} isInitial={this.props.is_initial} makeInitial={this.props.makeInitial} getInfo={this.props.getChallengeInfo} challengeInfo={this.props.challenge_info} save={this.props.saveChallenge}/>
          <DefaultChallenges userId={localStorage.getItem('userId')} defaultChallenges={this.props.default_challenges} save={this.props.saveChallenge}/>
        </div>
      </div>
    </div>
    )
  }
}
  


export default withRouter(ChallengeListView);