import React, { useState, useEffect } from 'react';
import "../../styles/profileCard.css";


const SocialLinks = ({ data }) => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  return (
    <div className="box-score social-links">
      <h5>Redes Sociales</h5>
      {data?.social_media && Object.keys(data?.social_media).length > 0 ? (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {data?.social_media.instagram && (
            <a href={data?.social_media.instagram.startsWith('http') ? data?.social_media.instagram : `https://instagram.com/${data?.social_media.instagram}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram fa-2x" style={{color: 'black'}}></i>
            </a>
          )}
          {data?.social_media.x && (
            <a href={data?.social_media.x.startsWith('http') ? data?.social_media.x : `https://x.com/${data?.social_media.x}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter fa-2x" style={{color: 'black'}}></i>
            </a>
          )}
          {data?.social_media.facebook && (
            <a href={data?.social_media.facebook.startsWith('http') ? data?.social_media.facebook : `https://facebook.com/${data?.social_media.facebook}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook fa-2x" style={{color: 'black'}}></i>
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
