import React from 'react';


const UserProfile = ({ github, skills, activeCandidates, getProfile, activeUser }) => {

  return (
      <div className='ui padded segment' style={{  width: '40%' }}>
        <h3>Skills</h3>
        <a href={ github }><i className='github icon github_icon_livecoding' style={{ fontSize: '30px', position: 'absolute', top: '25px', right: '15px'}}></i></a>
        <div className='ui small horizontal list' style={{ marginTop: '-5px'}}>
          <div style={{height:'250px', overflow: 'scroll'}}>
            
              { skills ? skills.map((skill) => {
                return (
                  <div className='ui tag label' style={{ margin: '15px'}}> { skill } </div>
                );
              }) : null }
          </div>
        </div>


        <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
          <h2>Active Users</h2>
            { activeCandidates ? activeCandidates.map((user, i) => {
              return (
                <div key={ i } style={ activeUser === user ? { backgroundColor: 'black', color: 'orange' } : { backgroundColor: '' } } className='active_user_div' onClick={ () => getProfile(user) }><i className="circle green icon"></i>{user}</div>
              )
            }) : null }
        </div>
      </div>
    )
  } 


export default UserProfile;
