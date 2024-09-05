import React, { useState } from "react";
import "../../styles/followCard.css";
import FollowButton from "./buttons/followButton.jsx";
import { USER_DATA } from "./data/userData";
import Avvvatars from "avvvatars-react";
import { Link } from "react-router-dom";

const FollowCard = ({ username, img, id }) => {
  return (
    <>
    <Link to={`/user/${id}`}>
      <div className="follow-card ">
      <span className="profile-image ">
            {img ? (
              <img
                src={img}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={username} size={200} />
            )}
          </span>
        <div className=" d-grid gap-4">
          <span className="fs-5 fw-bold ">@{username}</span>
          <FollowButton id={id}/>
        </div>
      </div>
    </Link>
    </>
  );
};

export default FollowCard;
