import React, { useState } from "react";
import "../../styles/followCard.css";
import FollowButton from "./buttons/followButton.jsx";
import { USER_DATA } from "./data/userData";
import Avvvatars from "avvvatars-react";

const FollowCard = () => {
  return (
    <>
      <div className="follow-card ">
      <span className="profile-image ">
            {USER_DATA.profileImg ? (
              <img
                src={USER_DATA.profileImg}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={USER_DATA.username} size={200} />
            )}
          </span>
        <div className=" d-grid gap-4">
          <span className="fs-5 fw-bold ">@{USER_DATA.username}</span>
          <FollowButton />
        </div>
      </div>
    </>
  );
};

export default FollowCard;
