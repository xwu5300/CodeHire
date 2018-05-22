import React from 'react';

const CompanyDetail = ({ logo, name, handleHover, indexHovered }) => {


  const noHover = {
    width: '25%',
    height: '200px',
    cursor: 'pointer'
  }

  const yesHover = {
   width: '25%',
   height: '200px',
   backgroundColor: 'orange',
   cursor: 'pointer'
  }

  return (
  <div onMouseOver={() => handleHover(name) } onMouseOut={ () => handleHover('mouseOut') }  className='ui card company_card' style={ indexHovered === name ? yesHover : noHover }>
    <img src={ logo } style={{ width: '100px', height: 'auto'}}/>
    <div className='company-name'>
      { name }
    </div>
  </div>
  )
}

export default CompanyDetail;