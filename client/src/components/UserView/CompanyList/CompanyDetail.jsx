import React from 'react';

const CompanyDetail = ({ row, accessor, CustomFunction }) => (
  <div>
    <div className='company-name'>
      {row[accessor][0]}
    </div>
    <div className='company-info'>
      {row[accessor][1]}
    </div>
  </div>
);

export default CompanyDetail;