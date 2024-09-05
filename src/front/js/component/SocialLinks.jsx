import React, { useState, useEffect } from 'react';

const SocialLinks = ({ data }) => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  return (
    <div className="box-score social-links">
      <h5>Redes Sociales</h5>
      {data?.social_media && Object.keys(data?.social_media).length > 0 ? (
        <div>
          {data?.social_media.instagram && (
            <a href={data?.social_media.instagram.startsWith('http') ? data?.social_media.instagram : `https://${data?.social_media.instagram}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          )}
          {data?.social_media.x && (
            <a href={data?.social_media.x.startsWith('http') ? data?.social_media.x : `https://${data?.social_media.x}`} target="_blank" rel="noopener noreferrer">
              <i onClick={console.log(data?.social_media.x)} className="fa-brands fa-x-twitter"></i>
            </a>
          )}
          {data?.social_media.facebook && (
            <a href={data?.social_media.facebook.startsWith('http') ? data?.social_media.facebook : `https://${data?.social_media.facebook}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
          )}
         
        </div>
      ) : (
        <p>No tienes redes sociales asociadas.</p>
      )}
    </div>
  );
};

export default SocialLinks;
