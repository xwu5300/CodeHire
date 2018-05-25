import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

class SavedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
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

  handleModal(companyId, userId) {
    this.props.fetchResults(companyId, userId, this.openModal);
  }

  render() {
    const customStyles = {
      content : {
        width: '40%',
        height: '40%',
        margin: 'auto',
        overflow: 'scroll'
      }
    };

    return(
      <div>
      {this.props.favorites.length === 0 ? null : this.props.favorites.map((user, i) => {
        return(
          <div className='row' style={{ marginBottom: '10px'}}>
          <div className='column'>
          <div className="ui segment hire_card" key={i}>
          {user.profile_photo ?
            <img src={user.profile_photo} className="ui small left floated image" style={{width: '100px'}}/> : <img src="profilePic.jpg"  style={{width: '100px'}} className="ui small left floated image"/> }
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github: {user.github_url ? user.github_url.includes('github.com') ? <a href={'http://' + user.github_url} target='_blank'>{user.github_url}</a> : <a href={'http://www.github.com/' + user.github_url} target='_blank'>www.github.com/{user.github_url}</a> : 'None added'}</div>
            <div>Resume: {user.resume_url ? <a href={user.resume_url} target="_blank">{user.resume_name}</a>: 'None added'}</div>
            <a className="cursor" onClick={()=>{this.handleModal(localStorage.getItem('userId'), user.user_id)}}>Past Challenge Results</a>
            <br/>
            <i className={user.contacted ? "envelope open icon cursor" : "envelope open outline icon cursor"} onClick={()=>{this.props.contact(user.id, localStorage.getItem('userId'), user.contacted)}}></i>
            <i className="heart icon search cursor" onClick={()=>this.props.remove(localStorage.getItem('userId'), user.user_id)}></i>
          </div>
          </div>
          </div>
        )
      })}
      <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
      {this.props.results.length > 0 ?
        this.props.results.map((item, i) => (
          <div className="candidate-results" key={i}>
            <h2>{item.name}</h2>
            <div><b>{item.title}</b></div>
            <div className='candidate_results_date'>{moment(item.completed_at).format('MMMM Do YYYY')}</div>
            <div style={item.user_passed ? {color: 'green'} : {color: 'red'}}><b>{item.user_passed ? "Passed" : "Failed"}</b></div>
            <div>{item.code}</div>
          </div>
        ))
        : "User has not yet taken any of your challenges"}
      </Modal>
      </div>
    )
  }
}

export default SavedUsers;