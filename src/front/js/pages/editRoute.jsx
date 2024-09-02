import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UploadFile from "../component/uploadFile.jsx";
import Accordion from "../component/accordion.jsx";
import { AddDay } from "../component/addDay.jsx";
import ActivityModal from "../component/activityModal.jsx";
import "../../styles/createRoute.css";

export const CreateRoute = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const getItinerary = store.itineraries.find(itinerary => itinerary.id === parseInt(params.theid));
  const itinerary = getItinerary;
  const itineraryKeys = Object.keys(itinerary.itinerary);


  const handleDiscard = () => {
    navigate("/user");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      store.newItineraryData.title &&
      store.newItineraryData.description &&
      store.newItineraryData.city &&
      Object.keys(store.newItineraryData.itinerary).length > 0 &&
      store.newItineraryData.images.img.length > 0
    ) {
      try {
        const resp = await fetch(process.env.BACKEND_URL + "/api/itineraries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(store.newItineraryData),
        });
        const data = await resp.json();

        if (!resp.ok) {
          const errorMsg = data.msg;
          throw new Error(errorMsg);
        }
        navigate("/user");
        window.location.reload();
        return { success: true, data: data }, 200;
      } catch (error) {
        console.error("Error creating itinerary:", error.message);
        return { success: false, msg: error.message };
      }
    }
  };
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="row w-100 ">
        <div className="col-md-5 upload-file my-5 mx-auto">
      {itinerary.images.img.length > 0 ? (
        <div id="uploadedFile" className="carousel slide mt-3">
          <div className="carousel-inner uploaded">
            <div className="carousel-item active">
              <img
                src={
                  itinerary.images.img.length > 0
                    ? itinerary.images.img[0]
                    : ""
                }
                className="d-block uploaded "
                alt="Imagen añadida"
              />
            </div>
            {itinerary.images.img.length > 1
              ? itinerary.images.img.slice(1).map((url, index) => (
                  <div key={index} className="carousel-item uploaded">
                    <img
                      src={url}
                      className="d-block uploaded"
                      alt="Imagen añadida"
                    />
                  </div>
                ))
              : ""}
            {itinerary.images.img.length > 1 ? (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#uploadedFile"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#uploadedFile"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-3 mb-5 d-flex flex-column align-items-center">
        <div className="mb-4 w-100">
          <label htmlFor="file-upload" className="file-upload-label w-100">
            <div className="file-upload-area">
              <i className="bi bi-upload"></i>
              <p className="mt-2 text-center">
                Haz clic para añadir imágenes o arrastra y suelta aquí
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="d-none"
              onChange={handleFile}
              accept=".jpg, .jpeg, .png, .heif, .webp"
            />
          </label>
        </div>
      </div>
      <div>
      <hr />
      <h5 className="mb-2">Información del itinerario:</h5>

      {/* Input para la ciudad con autocompletado */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ciudad"
          aria-label="Ciudad"
          aria-describedby="basic-addon1"
          value={cityValue}
          onChange={handleCityChange}
          ref={cityInputRef} // Agregamos la referencia al input de la ciudad
          required
        />
      </div>

      {/* Input para el título */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Título"
          aria-label="Titulo"
          aria-describedby="basic-addon1"
          maxLength="35"
          value={titleValue}
          onChange={handleInputTitleChange}
          required
        />
      </div>

      {/* Contenedor de etiquetas (tags) */}
      <div className="tags-container mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            #{tag}
            <span
              type="button"
              className="ms-1"
              aria-label="Remove"
              onClick={() => handleRemoveTag(index)}
            >
              <i className="fa-solid fa-x fa-xs" style={{ color: "#949494" }}></i>
            </span>
          </span>
        ))}
      </div>

      {/* Dropdown para seleccionar tags integrado en input-group */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control dropdown-toggle custom-dropdown-input"
          placeholder="Selecciona un tag"
          aria-label="Selecciona un tag"
          aria-describedby="basic-addon2"
          value={inputValue}
          readOnly
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu w-100">
          {predefinedTags.map((tag, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Textarea para la descripción */}
      <div className="mb-3">
        <textarea
          className="form-control"
          id="itiDescInput"
          rows="6"
          placeholder="Escribe algo aquí..."
          maxLength="250"
          value={descriptionValue}
          onChange={handleInputDescChange}
          required
        ></textarea>
      </div>
    </div>
    </div>
          <div className="col-12 col-md-5 my-2 mx-md-5">
            {/* <div className="float-end"> */}
            <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className=" mt-md-5 ms-3 md-ms-0 h4 mb-0">Itinerario:</h2>
      </div>
      <hr className="mt-0 ms-3" />
      <div className="d-flex flex-column align-items-center">
        {itineraryDataKeys?.map((key, index) => (
          <div className="mx-auto w-100" key={index}>
            <AccordionContainer
              id={index}
              title={key}
              del={
                <i
                  key={key}
                  onClick={() => deleteDay(key)}
                  className="bi bi-trash3 ms-3 text-danger"
                  style={{ cursor: 'pointer' }}
                ></i>
              }
            >
              <ul>
                {store.newItineraryData.itinerary[key].map((location, locIndex) => (
                  <li key={locIndex}>{location.address}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button
                  className="btn btn-outline-primary rounded-pill me-2"
                  type="button"
                  onClick={() => openMapForDay(store.newItineraryData.itinerary[key])}
                >
                  <i className="bi bi-map"></i> Ver mapa del día
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill"
                  type="button"
                  onClick={() => openDescriptionModal(key)}
                >
                  <i className="bi bi-pencil"></i> Añadir descripción
                </button>
              </div>
              {store.newItineraryData.itinerary[key].description && (
                <div className="mt-2">
                  <p><strong>Descripción:</strong> {store.newItineraryData.itinerary[key].description}</p>
                </div>
              )}
            </AccordionContainer>
          </div>
        ))}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyC20pludzsgDBOMAznGfEvwYsZihsnxu8E" libraries={libraries}>
       <div className="map ms-3">
       <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {points.map((point, index) => (
            <Marker key={index} position={point} />
          ))}

          {points.length >= 2 && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={handleDirectionsCallback}
            />
          )}

          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
            />
          )}
        </GoogleMap>
       </div>

        <div  className="ms-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceSelect}
            options={{
              componentRestrictions: { country: "es" },
            }}
          >
            <input
              className="addLocation form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Introduce una ubicación"
              
            />
          </Autocomplete>
          <button
            className="btn btn-outline-primary rounded-pill mb-2 col-md-3 "
            type="button"
            onClick={handleAddDay}
          >
            <i className="bi bi-plus"></i> Añadir día
          </button>

          <span className="deleteLocationButton">
            <RedButton type={"button"} buttonName={"Eliminar ubicación"} onclick={handleRemoveLastPoint} />
          </span>
        </div>

        {isModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="mapModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0 rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title" id="mapModalLabel">
                    Mapa del Día
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentDayPoints.length > 0 ? currentDayPoints[0] : center}
                    zoom={currentDayPoints.length > 0 ? 12 : 6}
                  >
                    {modalDirectionsResponse && (
                      <DirectionsRenderer
                        options={{ directions: modalDirectionsResponse }}
                      />
                    )}
                  </GoogleMap>
                </div>
              </div>
            </div>
          </div>
        )}

        {descriptionModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="descriptionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0 rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title" id="descriptionModalLabel">
                    Descripción del Día
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDescriptionModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escribe una descripción..."
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDescriptionSave}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </LoadScript>
    </>
            <div className="d-flex gap-3 w-75 mb-5 mx-auto mt-5">
              <button
                type="button"
                onClick={handleDiscard}
                className="btn btn-secondary discard rounded-pill flex-grow-1"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="btn btn-primary publish rounded-pill flex-grow-1"
              >
                Publicar
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </form>
    </>
  );
};
