import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Context } from '../store/appContext';
import "../../styles/dropDownButton.css";

const LogoutLink = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    store.token = "";
    navigate("/")


    
  };

  return (
    <div
        className="dropdown-item-logout ms-3 mb-2"
        style={{cursor:'pointer'}}
        onClick={(e) => {
          e.preventDefault(); 
          handleLogout(); 
        }}
      >
        Cerrar Sesión
      
    </div>
  );
};

export default LogoutLink;
