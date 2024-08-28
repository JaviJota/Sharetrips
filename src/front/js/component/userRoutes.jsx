import React from "react";
import { USER_ROUTES } from "./data/userRoutes";
import BlueButton from "./buttons/blueButton.jsx";
import SmallRouteCard from "./smallRouteCard.jsx";
import { Link } from "react-router-dom";

const UserRoutes = () => {
  return (
    <>
      <div className="userRoutes ms-5 my-4 justify-content-center ">
        <h2 className="text-center fw-bold pt-5 pb-3">Mis Rutas</h2>
        {USER_ROUTES.map((route, index,) => (
          <SmallRouteCard
            img={route.routeImg}
            title={route.title}
            key={index}
          />
        ))}
        <br />
        <span className="fw-bold fs-5 d-flex justify-content-center">
          Crear nueva ruta
        </span>
        <span className="d-flex justify-content-center mt-3">
          
          <Link to={"/route/create"}>
          <BlueButton buttonName={<i className="fa-solid fa-plus"></i>} />
          </Link>
        </span>

      </div>
    </>
  );
};

export default UserRoutes;
