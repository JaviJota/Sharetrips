import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import "../../styles/inputRutas.css";

export const InputRutas = () => {
  const { actions } = useContext(Context);

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [cityValue, setCityValue] = useState(""); 
  const cityInputRef = useRef(null); 



  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        cityInputRef.current,
        {
          types: ["(cities)"],
          componentRestrictions: { country: "es" }, 
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setCityValue(place.name); 
        actions.setCity(place.name); 
      });
    }
  }, [actions]);

  const handleInputTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitleValue(newTitle);
    actions.setTitle(newTitle); 
  };

  const handleInputDescChange = (e) => {
    const newDescription = e.target.value;
    setDescriptionValue(newDescription);
    actions.setDescription(newDescription); 
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCityValue(newCity);
    actions.setCity(newCity); 
  };


  return (
    <div>
      <hr />
      <h5 className="mb-2">Información del itinerario:</h5>

     
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ciudad"
          aria-label="Ciudad"
          aria-describedby="basic-addon1"
          value={cityValue}
          onChange={handleCityChange}
          ref={cityInputRef} 
          required
        />
      </div>

  
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
  );
};
