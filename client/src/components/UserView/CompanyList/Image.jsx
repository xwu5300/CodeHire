import React from 'react';

const Image = ({ row, accessor, CustomFunction }) => (
  <img src={ row[accessor] } className="company_logo" width="200" height="200"/>
);

export default Image;