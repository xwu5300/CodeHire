import React from 'react';


const UserProfile = ({ github, skills }) => {
  return (
      <div className='user_profile_container'>
        <h3>Skills</h3>
        <p>{ skills }</p>
        <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
      </div>
    )
}

export default UserProfile;