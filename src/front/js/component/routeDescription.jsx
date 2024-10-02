import React from "react";
import "../../styles/ruteDescription.css";

const RouteDescription = ({ data }) => {
  return (
    <>
      <div className="description w-100 mx-5 my-5">
        <header className="d-flex my-4 justify-content-between">
          <h5>{data.title}</h5>
          <span>{data.duration} días.</span>
        </header>
        <section className="description ">
          <h5>Descripción de la ruta</h5>
          <p className="">{data.description}</p>
        </section>
      </div>
    </>
  );
};

export default RouteDescription;
