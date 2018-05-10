import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import CompanyChallenges from './ChallengeListView/CompanyChallenges.jsx';
import DefaultChallenges from './ChallengeListView/DefaultChallenges.jsx';
import Form from './ChallengeListView/Form.jsx';


const showModal = function(){
  $('.ui.long.modal')
    .modal({
      centered: true
    })
  .modal('show')
}


const ChallengeListView = ({ all_challenges, default_challenges, deleteChallenge, saveChallenge, addToCompanySchedule, is_initial, makeInitial, history }) => {
  return (
    <div>
      <button className="ui button home" onClick={() => {history.push('/admin')}}>Back to Home</button>
      <div className='challenge_list'>
        <button className="ui button" onClick={() => {showModal()}}>Input new challenge</button>
        <div className="ui long modal" style={{width: '60%'}}>
          <i className="close icon"></i>
          <div className="scrolling content">
            <Form save={ saveChallenge }/>
          </div>
        </div>
        <div className='ui padded horizontal segments challenge_list'>
          <CompanyChallenges allChallenges={ all_challenges } delete={ deleteChallenge } addToSchedule={ addToCompanySchedule } isInitial={is_initial} makeInitial={makeInitial} />
          <DefaultChallenges defaultChallenges={ default_challenges } save={ saveChallenge }/>
        </div>
      </div>
    </div>
  )
}


export default withRouter(ChallengeListView);