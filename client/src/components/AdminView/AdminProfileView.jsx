import React, { Component } from 'react';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    fillme: 'in later'
  }
}

class AdminProfileView extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    console.log(this.props);
  }
  
  render() {
    return (
      <div className='company_profile'>
        <div className='ui centered raised padded container segment'>
          <div className='ui centered grid'>
            <h1>Company Profile</h1>
            <div className='row'>
              <img src='http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w' />
            </div>
            <div className='row'>
              <input className='ui input' type='text' placeholder='Change Image' />
              <button type='ui button'>Save Changes</button>
            </div>
            
            <div className='row'>
              <textArea>Current Info will show here</textArea>
            </div>
            <div className='row six column'>  
              <button type='ui button'>Save Changes</button>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
//const AdminProfile = connect(null, mapDispatchToProps)(AdminProfile); //can change out dispatch to props if not needed

export default AdminProfileView;