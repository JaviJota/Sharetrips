import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UploadFile from "../component/uploadFile.jsx";
import Accordion from "../component/accordion.jsx";
import { AddDay } from "../component/addDay.jsx";
import ActivityModal from "../component/activityModal.jsx";

export const CreateRoute = (props) => {
  const { store, actions } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      store.newItineraryData.title &&
      store.newItineraryData.description &&
      store.newItineraryData.city &&
      Object.keys(store.newItineraryData.itinerary).length > 0 &&
      store.newItineraryData.images.img.length > 0
    ){
      try {
        const resp = await fetch(process.env.BACKEND_URL + '/api/itineraries',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(store.newItineraryData)
        });
        const data = await resp.json();
        
        if (!resp.ok) {
          const errorMsg = data.msg
          throw new Error(errorMsg);
        }

        return { success: true, data: data }, 200
      } catch (error) {
        console.error('Error creating itinerary:', error.message);
             return { success: false, msg: error.message };
      }
    };

  };
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="row w-100 justify-content-center">
            <UploadFile />
            <AddDay />
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-success">Publicar</button>
        </div>
      </form>
    </>
  );
};