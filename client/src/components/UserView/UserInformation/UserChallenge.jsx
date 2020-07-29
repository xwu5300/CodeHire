import React from 'react';

const UserChallenge = ({ row, accessor, CustomFunction }) => (
  <div className='history_card'>
  
   <ul className='history_list' style={{ textAlign: 'center'}}>
    <li>
      <b>Title:</b> {row[accessor].title}
    </li>
     <li>
      <b>Company:</b> {row[accessor].name}
    </li>
    <li>
      <b>difficulty:</b> {row[accessor].difficulty}
    </li>
   </ul> 
  
  <hr />

     <div className='time'>
      Completed At: {row[accessor].completedAt}
    </div>
   
    <br /><br />
    <div className='score'>
      <b>Status:</b> {row[accessor].isPassed}
    </div>
    <br />
    <div className='instruction'>
      <b>Instruction:</b> {row[accessor].instruction}
    </div>
    <br/>
    <div className='code'>
      {row[accessor].code}
    </div>
  </div>
);

export default UserChallenge;
