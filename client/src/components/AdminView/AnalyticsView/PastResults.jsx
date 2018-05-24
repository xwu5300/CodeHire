import React, { Component } from 'react';
import Modal from 'react-modal';

class PastResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    }, ()=> {
      console.log(this.props)
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  handleModal(candidateId, scheduleId) {
    this.props.fetchCandidateResults(candidateId, scheduleId, this.openModal);
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

    return (
      <div className="past-challenge-container">
      <button className="ui orange button" onClick={()=>{this.props.showTable()}}>Back to Past Challenges</button>
      <table className="ui celled table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {this.props.pastResults.map((item) => {
        return (
          <tr key={item.candidate_id}>
            <td>{item.username}</td>
            <td style={item.user_passed ? {color: 'green'} : {color: 'red'}} >{item.user_passed ? "Passed" : "Failed"}</td>
            <td className="code cursor" onClick={()=> {this.handleModal(item.candidate_id, item.company_schedule_id)}}>View Code</td>
            <td><i className={!this.props.favorites.includes(item.id) ? "heart outline icon cursor" : "heart icon cursor"} 
            onClick={!this.props.favorites.includes(item.id) ? ()=>{this.props.save(localStorage.getItem('userId'), item.candidate_id)} : () => this.props.remove(localStorage.getItem('userId'), item.candidate_id)}></i></td>
          </tr>
        )
      })}
      </tbody>
      </table>
      <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
      {this.props.candidateResults.length > 0 ?
        <div>
          <div>{this.props.candidateResults[0].code}</div>
        </div> : null}
      </Modal>
      </div>
    )
  }
}


export default PastResults;