import React from 'react';
import moment from 'moment';

const Time = ({row, accessor, CustomFunction }) => {
  return(
    <div>{moment(row[accessor]).format('MMMM Do YYYY dddd, h:mm A')}</div>
  )
}

export default Time;