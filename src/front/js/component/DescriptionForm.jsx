
import React, { useState, useEffect } from 'react';

const DescriptionForm = ({ data }) => {
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  
  return (
    <div className="box-score description-form">
      <p>{data?.description}</p>
      
    </div>
  );
};

export default DescriptionForm;
