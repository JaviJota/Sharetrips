import React from "react";
import { USER_DATA } from "./data/userData";
import FollowButton from "../component/buttons/followButton.jsx"
import "../../styles/profileCard.css";
import Avvvatars from "avvvatars-react";

const ProfileCard = () => {
  return (
    <>
      <div className="profile-card mx-5 my-5">
        <i className="settings fs-3 fa-solid fa-gear d-flex justify-content-end me-5"></i>
        <div className="d-grid gap-4">
          <span className="profile-image mx-auto">
            {USER_DATA.profileImg ? (
              <img
                src={USER_DATA.profileImg}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={USER_DATA.username} size={300} />
            )}
          </span>
          <span className="username fw-bold mx-auto">
            @{USER_DATA.username}
          </span>
          <div className="d-grid gap-2">
            <span className="followers mx-auto">
              {USER_DATA.followers} seguidores
            </span>
            <span className="following mx-auto">
              {USER_DATA.following} seguidos
            </span>
          </div>
          <span className="follow mx-auto">
            <FollowButton />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
