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
        <div className="tags d-flex my-4">
          {/* <span>
            {description.tags.map((tag) => (
              <button className="tag mx-2 rounded-pill py-1 px-4">{tag}</button>
            ))}
          </span> */}
        </div>
        <section className="description ">
          <h5>Descripción de la ruta</h5>
        </section>
          <p className="">{data.description}</p>
      </div>
    </>
  );
};

export default RouteDescription;
