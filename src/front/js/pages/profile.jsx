import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import UserRoutes from "../component/userRoutes.jsx";
import ProfileCard from "../component/profileCard.jsx";
import CommentBox from "../component/CommentBox.jsx";
import DescriptionForm from "../component/DescriptionForm.jsx";
import SocialLinks from "../component/SocialLinks.jsx";
import Rating from "../component/Rating.js";


export const Profile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      const resp = await fetch(process.env.BACKEND_URL + `/api/users/${params.theid}`)
      const data = await resp.json()

      if (!resp.ok) {
        const errorMsg = data.msg
        throw new Error(errorMsg);
      }
      return data
    } catch (error) {
      console.error('Error creating user:', error.message);
       return { success: false, msg: error.message };
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUserData(data.user); // Guardamos los datos en el estado
      } catch (error) {
        setError(error.message); // Guardamos el error en caso de que ocurra
      } finally {
        setLoading(false); // Indicamos que la carga ha terminado
      }
    };

    fetchData(); // Llamamos a la función
  }, [params.theid]);

  return (
    <div className="profile-container">
      <div className="user-routes-container">
        <UserRoutes data={userData?.itinerary} id={userData?.id}/>
      </div>
      
      <div className="description-box-container">
        <div className="description-form-container">        
          <DescriptionForm data={userData}/>
        </div>
        {/* <div className="comment-box-container">
          <CommentBox />
        </div> */}
        <div className="social-box-container">
          <SocialLinks data={userData}/>
        </div>
        {/* <div className="rating-box-container">
          <Rating />
        </div> */}
      </div>
      
      <div className="profile-card-container">
        <ProfileCard data={userData}/>
      </div> 
    </div>
  );
};
