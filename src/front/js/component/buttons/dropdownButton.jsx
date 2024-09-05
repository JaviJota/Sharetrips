import React, { useState, useEffect } from "react";
import LogoutLink from "../logout.js";
import { Link } from "react-router-dom";

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
      <ul className="dropdown-menu dropdown-menu-light">
        <li>
          <Link to={`/user/${userId}`}>
            Mi perfil
          </Link>
        </li>
        <li>
          <Link to={'/route/create'}>
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
