import React, { Component } from 'react';

import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import UpdateForm from '../UpdateForm.jsx';
import Modal from 'react-modal';

var total = 0;

export const cardSource = {
  beginDrag(props, monitor, component) {
    console.log('challenge card challenge', props.challenge)
    return {
      challengeId: props.challengeId,
      companyId: props.challenge.company_id,
      duration: props.challenge.duration,
      time: null,
      challenge: props.challenge
    };
  }
}

export const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class ChallengeCard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      isExpanded: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.expandCard = this.expandCard.bind(this);
  }
  
  componentDidMount() {
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

  handleModal(challengeId) {
    this.props.getInfo(challengeId, this.props.userId, this.openModal);
  }

  expandCard() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
 
  render() {

    const tab = {
      height: '35px',
      overflow: 'hidden',
    }
  
  
  const { column, default_challenge, challenge, index, challengeId, userId, title, instruction, difficulty, deleteChallenge, connectDragSource, isDragging } = this.props;

  if(default_challenge) {
    var cardColor = 'ui fluid orange card challenge_card';
  } else {
    cardColor = 'ui fluid black card challenge_card';
  }


  return connectDragSource (
    <div className={ cardColor } style={this.state.isExpanded ? null : tab}>
      <div className='content challenge_content'>
        
        <i onClick={ () => this.expandCard() } className="angle down icon expand_icon cursor"></i>
       
      { this.state.isExpanded ? 
        <div>
          <div><b>Title:</b> {title}</div>  
          <div><b>Description:</b> {instruction}</div>
          <div><b>Difficulty:</b> {difficulty}</div>
        </div>
       :
       <div>
         <span style={{fontSize: '20px', position: 'relative', bottom: '5px'}}> { title } </span>
         <span style={{position:'relative', bottom: '5px', float: 'right', marginRight: '50px'}}> <b>difficulty:</b> { difficulty }</span>
       </div>
     }
        <div className='saved_challenges_btns'>

          <button className="ui icon red button" onClick={() => deleteChallenge(challenge, userId) }>
            <i className="trash icon"></i>
          </button>
          
          {!this.props.challengeInfo ? null :
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <UpdateForm challengeInfo={this.props.challengeInfo} save={this.props.save} close={this.closeModal} userId={this.props.userId}/>
          </Modal>}

          {!this.props.default_challenge ? 
          <button className="ui icon button" onClick={() => this.handleModal(challengeId) }>
            <i className="edit icon"></i>
          </button>
          :
          null }

        </div>
      </div>
    </div>
  )
}
}

export default DragSource(ItemTypes.Card, cardSource, collect)(ChallengeCard);