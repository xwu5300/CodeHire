import React from 'react';

const Image = ({ row, accessor, CustomFunction }) => {
  return (
    <div className='company_logo_container'>
      <img src={ row[accessor].url } className="company_logo" />
      <button className='ui orange inverted button view_company_btn' onClick={() => CustomFunction(row[accessor])}>
        View Company Page
      </button>
    </div>
  )
}


export default Image;