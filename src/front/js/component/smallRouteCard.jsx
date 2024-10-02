import React from "react";
import { Link } from "react-router-dom"; 
import "../../styles/smallRouteCard.css";

const SmallRouteCard = ({ img, title, routeId }) => {
  return (
    <Link to={`/route/${routeId}`} className="text-decoration-none"> 
      <div className="smallRouteCard d-flex align-items-center p-3 mb-4 text-black">
        <img className="smallroute" src={img} alt={title} />
        <h5 className="m-0 fw-bold">{title}</h5>
      </div>
    </Link>
  );
};

export default SmallRouteCard;
