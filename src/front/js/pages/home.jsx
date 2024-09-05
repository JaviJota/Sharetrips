import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.jsx";
import { LoginRegister } from "../component/registerModal.jsx";
import { Jumbotron } from "../component/jumbotron.jsx";
import RutaDestacada from "../component/rutaDestacada.jsx";
import { ForgotPassword } from "../component/recuperar-contraseña.jsx";





export const Home = () => {
  const { store, actions } = useContext(Context);
  const [rutasDestacadas, setRutasDestacadas] = useState([])
  // const [itinerarios, setItinerarios] = useState([])

  useEffect(() => {
    const getRutasDestacadas = async () => {
      try {
        const resp = await fetch(process.env.BACKEND_URL + '/api/itineraries', {
          method: 'GET',
        });
        const data = await resp.json();
        const { itineraries } = data
        // setItinerarios(itineraries)
        store.itineraries = itineraries
        if (!resp.ok) throw new Error('error');
        
        setRutasDestacadas(data.itineraries.slice(0, 3))

        
        
        console.log(rutasDestacadas)
      } catch (error) {
        console.error('Error:', error);
      }
      
    }
    getRutasDestacadas()
  }, [])

  console.log(store.itineraries)

 

  return (
    <>
      {/* <Navbar /> */}
      <LoginRegister />
      {/* <ForgotPassword /> */}
      <Jumbotron />
      <h4>Rutas destacadas 🔥</h4>
      <div className="carruseldestacado row justify-content-around justify-content-xxl-evenly mx-5 ">
      {rutasDestacadas?.map((ruta, index) => (
       <div key={index} className="col-lg-4 d-flex justify-content-center">
        <RutaDestacada data={ruta} index={index}/>
      </div>
      ))}
        {/* <div className="col-lg-4 d-flex justify-content-center">
          <RutaDestacada />
        </div>
        <div className="col-lg-4 d-flex justify-content-center">
          <RutaDestacada />
        </div>
        <div className="col-lg-4 d-flex justify-content-center">
          <RutaDestacada />
        </div> */}
      </div>
    </>
  );
};
