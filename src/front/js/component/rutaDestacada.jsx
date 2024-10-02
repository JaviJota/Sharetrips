import React from "react";
import "../../styles/rutaDestacada.css";
import { Link } from "react-router-dom";

const RutaDestacada = ({data, index}) => {
  return (
    <div className="">
      <div id={`carousel${index}`} className=" carousel slide mt-3">
        <div className="carousel-inner  ">
          <div className="carousel-item active">
            <img
              src={data?.images?.img[0]}
              className="d-block home"
              alt="..."
            />
          </div>
          {data?.images?.img?.length > 1 ?
              data?.images?.img?.slice(1).map((url, index) => (
                  <div key={index} className=" carousel-item ">
                    <img
                      src={url}
                      className="d-block"
                      alt="Imagen añadida"
                    />
                  </div>
                ))
              : ""}
 
        </div>
        {data?.images?.img?.length > 1 ? (
              <>
              <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel${index}`}
          data-bs-slide="prev"
        >
          <span className=" carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className=" carousel-control-next"
          type="button"
          data-bs-target={`#carousel${index}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
              </>):""}
        
      </div>
      <Link to={`/route/${data?.id}`}>

      <h3 className="titulo-ruta-destacada text-center text-md-start mt-3 mb-4 ms-1">{data?.title}</h3>

      </Link>
    </div>
  );
};

export default RutaDestacada;