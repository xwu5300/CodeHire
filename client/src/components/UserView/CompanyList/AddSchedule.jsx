import React from 'react';

const AddSchedule = ({row, accessor, CustomFunction }) => {
  return(
    <button onClick={() => CustomFunction(row[accessor])}>
       Add to Schedule
    </button>
  )
}

export default AddSchedule;