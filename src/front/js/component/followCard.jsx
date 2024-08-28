import React, { useState } from "react";
import "../../styles/followCard.css";
import FollowButton from "./buttons/followButton.jsx";
import { USER_DATA } from "./data/userData";

const FollowCard = () => {
  return (
    <>
      <div className="follow-card mx-5 my-5">
        <img className="profile-img" src={USER_DATA.profileimg} alt="" />
        <div className=" d-grid gap-4">
          <span className="fs-5 fw-bold ">@{USER_DATA.username}</span>
          <FollowButton />
        </div>
      </div>
    </>
  );
};

export default FollowCard;
