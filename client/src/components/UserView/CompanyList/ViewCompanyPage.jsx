import React from 'react';

const ViewCompanyPage = ({row, accessor, CustomFunction }) => {
  return(
    <button className='ui orange button' onClick={() => CustomFunction(row[accessor])}>
       View Company Page
    </button>
  )
}

export default ViewCompanyPage;