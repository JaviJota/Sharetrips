
import React  from 'react';

const DescriptionForm = ({ data }) => {

  return (
    <div className="box-score description-form">
      <p>{data?.description}</p>
      
    </div>
  );
};

export default DescriptionForm;
