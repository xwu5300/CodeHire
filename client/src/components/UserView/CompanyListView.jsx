import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';


const CompanyListView = (props) => {
  return (
    <div>
    <button className='ui green button' onClick={() => {props.history.push('/user/profile')}}>Edit Profile</button>
     <h2 style={{ textAlign: 'center' }}>Companies</h2>
    <div className='ui centered grid'>
     
     
      <div className='five wide column'> 
        <img src='https://vignette.wikia.nocookie.net/silicon-valley/images/a/a7/Piedpiperoldlogo.png/revision/latest/zoom-crop/width/320/height/320?cb=20140703205023' />
        <p> </p>
        <button onClick={() => {props.history.push('/user/schedule')}}>View Company Page</button>
      </div>

       <div className='five wide column'> 
        <img src='https://vignette.wikia.nocookie.net/silicon-valley/images/a/a7/Piedpiperoldlogo.png/revision/latest/zoom-crop/width/320/height/320?cb=20140703205023' />
        <p> </p>
        <button onClick={() => {props.history.push('/user/schedule')}}>View Company Page</button>
      </div>

       <div className='five wide column'> 
        <img src='https://vignette.wikia.nocookie.net/silicon-valley/images/a/a7/Piedpiperoldlogo.png/revision/latest/zoom-crop/width/320/height/320?cb=20140703205023' />
        <p> </p>
        <button onClick={() => {props.history.push('/user/schedule')}}>View Company Page</button>
      </div>
    </div>

     <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Your Calendar</h2>
     <div className='candidate_calendar inverted ui raised container segment'></div>
    </div>
  )
}

//if you import mapstate to props, be sure to use connect


export default withRouter(CompanyListView);