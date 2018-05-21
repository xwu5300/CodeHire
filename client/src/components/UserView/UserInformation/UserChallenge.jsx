import React from 'react';

const UserChallenge = ({ row, accessor, CustomFunction }) => (
  <div>
    <div className='company-name'>
      Company: {row[accessor].name}
    </div>
    <div className='title'>
      Title: {row[accessor].title}
    </div>
    <br/>
    <div className='challenge'>
      difficulty: {row[accessor].difficulty}{`    , ${row[accessor].isInitial}`}
    </div>
    <div className='score'>
      {row[accessor].isPassed}, Score: {row[accessor].score}
    </div>
    <div className='instruction'>
      Instruction: {row[accessor].instruction}
    </div>
    <div className='time'>
      Completed At: {row[accessor].completedAt}
    </div>
    <br/>
    <div className='code'>
      {row[accessor].code}
    </div>
  </div>
);

export default UserChallenge;
