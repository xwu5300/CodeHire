import React from 'react';

const CompanyDetail = ({ row, accessor, CustomFunction }) => (
  <div>
    <div className='company-name'>
      {row[accessor].name}
    </div>
    <div className='company-info'>
      {row[accessor].information}
    </div>
  </div>
);

export default CompanyDetail;