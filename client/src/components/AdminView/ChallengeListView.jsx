import React, { Component } from 'react';
import { connect } from "react-redux";
import CompanyChallenges from './ChallengeListView/CompanyChallenges.jsx';
import DefaultChallenges from './ChallengeListView/DefaultChallenges.jsx';
import Form from './ChallengeListView/Form.jsx';

   
const ChallengeListView = ({ all_challenges, default_challenges, deleteChallenge, saveChallenge, addToCompanySchedule, is_initial, makeInitial }) => {
  return (
    <div className='challenge_list'>
      <div className='ui padded horizontal segments challenge_list'>
        <CompanyChallenges allChallenges={ all_challenges } delete={ deleteChallenge } addToSchedule={ addToCompanySchedule } isInitial={is_initial} makeInitial={makeInitial} />
        <DefaultChallenges defaultChallenges={ default_challenges } save={ saveChallenge }/>
      </div>
      <Form save={ saveChallenge }/>
    </div>
  )
}


export default ChallengeListView;