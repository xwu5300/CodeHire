import React from 'react';

const UserProfile = ({ github, skills, about }) => {


  if(!skills && about) {
    return (
      <div className='user_profile_container'>
        <h3>About</h3>
        <p>{ about }</p>
        <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
      </div>
    )
  } else if(!about && skills) {
    return (
      <div className='user_profile_container'>
        <h3>Skills</h3>
        <p>{ skills }</p>
       <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
      </div>
    ) 
  } else if(about && skills) {
    return (
      <div className='user_profile_container'>
        <h3>Skills</h3>
        <p>{ skills }</p>
        <h3>About</h3>
        <p>{ about }</p>
        <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
      </div>
    );
  } else {
    return (
      <div className='user_profile_container'>
        <h1>No User Profile</h1>
        <a href={ github }><i className='github icon github_icon_livecoding'></i></a>
      </div>
    )
  }
}

export default UserProfile;