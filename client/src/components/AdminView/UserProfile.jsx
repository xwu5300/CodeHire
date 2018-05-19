import React from 'react';


const UserProfile = ({ github, skills, activeCandidates, getProfile, activeUserId }) => {
  return (
      <div className='ui padded segment' style={{ width: '40%' }}>
        <div style={{height:'300px'}}>
          <h3>Skills</h3>
          { skills ? skills.map((skill) => {
            return (
              <div>{skill}</div>
            );
          }) : null }
          <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
        </div>

        <div style={{ width: '80%', margin: 'auto' }}>
        <h2>Active Users</h2>
          
          {activeCandidates ? activeCandidates.map((user, i) => {
            return (
              <div key={ i } onClick={ () => getProfile(user) } style={{ cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', height: '50px' }}><i className="circle green icon"></i>{user}</div>
            )
          }) : null }
          </div>
     
      </div>
    )
}

export default UserProfile;
