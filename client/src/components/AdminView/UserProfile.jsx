import React from 'react';

const UserProfile = ({ skills, about }) => {

  if(!skills && about) {
    return (
      <div className='user_profile_container'>
        <h3>About</h3>
        <p>{ about }</p>
      </div>
    )
  } else if(!about && skills) {
    return (
      <div className='user_profile_container'>
        <h3>Skills</h3>
        <p>{ skills }</p>
      </div>
    ) 
  } else if(about && skills) {
    return (
      <div className='user_profile_container'>
        <h3>Skills</h3>
        <p>{ skills }</p>
        <h3>About</h3>
        <p>{ about }</p>
      </div>
    );
  } else {
    return (
      <div className='user_profile_container'>
        <h1>No User Profile</h1>
      </div>
    )
  }
}

export default UserProfile;