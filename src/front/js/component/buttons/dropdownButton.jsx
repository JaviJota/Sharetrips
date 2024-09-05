import React, { useState, useEffect } from "react";
import LogoutLink from "../logout.js";
import { Link } from "react-router-dom";
import "../../../styles/dropDownButton.css"


const DropdownButton = ({ buttonName, icon }) => {

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  return (
    <div className="dropdown">
      <button
        className="custom-button rounded-pill py-2 px-3 dropdown-toggle mx-2 my-2"
        data-bs-toggle="dropdown"
        type="button"
        aria-expanded="false"
      >
        {icon} {buttonName}
      </button>
      <ul className="dropdown-menu custom-dropdown-menu">
        <li>
          <Link to={`/user/${userId}`} className="dropdown-item">
            Mi perfil
          </Link>
        </li>
        <li>
          <Link to={'/route/create'} className="dropdown-item">
            Crear itinerario
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <LogoutLink />
        </li>
      </ul>
    </div>
  );
};

export default DropdownButton;