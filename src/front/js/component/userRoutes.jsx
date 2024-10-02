import React from "react";
import BlueButton from "./buttons/blueButton.jsx";
import SmallRouteCard from "./smallRouteCard.jsx";
import "../../styles/profileCard.css";
import { Link } from "react-router-dom";


const UserRoutes = ({ data, id }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  return (
    <>
      <div className="userRoutes ms-md-3 my-4 justify-content-center ">
        <h2 className="text-center fw-bold pt-5 pb-3">Mis Rutas</h2>
        {data?.map((route, index) => (
          <SmallRouteCard
            img={route.images?.img[0]}
            title={route.title}
            routeId={route.id}
            key={index}
          />
        ))}
        <br />
        {userId != id ? (
          ""
        ) : (
          <>
            <span className="nueva-ruta fw-bold fs-4 d-flex justify-content-center">
              Crear nueva ruta
            </span>
            <span className="agregar-ruta d-flex justify-content-center mt- mb-5">
              <Link to={"/route/create"}>
                <BlueButton buttonName={<i className="fa-solid fa-plus"></i>} />
              </Link>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default UserRoutes;
