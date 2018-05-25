import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

class UserSearchResults extends Component {
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
    this.props.fetchResults(companyId, userId, null, this.openModal);
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
        {this.props.users.length === 0 ? <div>No results found. Please search again.</div> : this.props.users.map((user, i) => {
          return (
          <div className='row' style={{ marginBottom: '10px' }}>
           <div className='column'>
          <div className="ui segment hire_card">
            {user.profile_photo ?
            <img src={user.profile_photo} className="ui small left floated image" style={{width: '100px'}}/> : <img src="profilePic.jpg" style={{width: '100px'}} className="ui small left floated image"/> }
            <div>Username: {user.username}</div>
            <div>Skills: {user.candidate_skills ? user.candidate_skills : 'None added'}</div>
            <div>Info: {user.information ? user.information : 'None added'} </div>
            <div>Github: {user.github_url ? user.github_url.includes('github.com') ? <a href={'http://' + user.github_url} target='_blank'>{user.github_url}</a> : <a href={'http://www.github.com/' + user.github_url} target='_blank'>www.github.com/{user.github_url}</a> : 'None added'}</div>
            <div>Resume: {user.resume_url ? <a href={user.resume_url} target="_blank">{user.resume_name}</a>: 'None added'}</div>
            <a className="cursor" onClick={()=>{this.handleModal(localStorage.getItem('userId'), user.id)}}>Past Challenge Results</a>
            <br/>
            <i className={!this.props.favorites.includes(user.id) ? "heart outline icon search cursor" : "heart icon search cursor"} 
            onClick={!this.props.favorites.includes(user.id) ? ()=>{this.props.save(localStorage.getItem('userId'), user.id)} : ()=>this.props.remove(localStorage.getItem('userId'), user.id)}></i>
          </div>
          </div>
          </div>
          )
        })}
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
        {this.props.results.length > 0 ?
          this.props.results.map((item, i) => (
            <div className="candidate-results" key={i}>
              <div className='candidate_results_date'>{moment(item.completed_at).format('MMMM Do YYYY')}</div>
              <h2> {item.title} </h2>
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



export default UserSearchResults;