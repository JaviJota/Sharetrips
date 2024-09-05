import React, { useState } from "react";
import { USER_DATA } from "./data/userData";
import FollowButton from "../component/buttons/followButton.jsx";
import "../../styles/profileCard.css";
import Avvvatars from "avvvatars-react";

const ProfileCard = ({ data }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    profile_image: "",
    description: "",
    social_media: {
      x: "",
      facebook: "",
      instagram: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      social_media: {
        ...formData.social_media, // Mantenemos los demás valores en "social_media"
        [name]: value, // Actualizamos solo la red social correspondiente
      },
    });
  };

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "dlfq7smx");
      formData.append("api_key", "853636263856715");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dlfq7smx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (res.ok) {
          setFormData({ ...formData, profile_image: data.url });
        } else {
          console.error("Error uploading image:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Perfil actualizado con éxito");
        // Cerrar el modal si la actualización es exitosa
        window.location.reload(); // Refresca la página para reflejar los cambios
        return true;
      } else {
        alert(`Error: ${data.msg || "Error desconocido"}`);
        console.error("Error en la respuesta:", result);
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
      return false;
    }
  };

  return (
    <>
      <div className="profile-card">
        {userId != data?.id ? (
          ""
        ) : (
          <i
            className="settings fs-3 fa-solid fa-gear ms-auto me-5"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
          ></i>
        )}
        <div className="d-grid gap-4">
          <span className="profile-image mx-auto">
            {data?.profile_image ? (
              <img
                src={data?.profile_image}
                alt="User profile"
                className="profile-img"
              />
            ) : (
              <Avvvatars value={data?.username} size={200} />
            )}
          </span>
          <span className="username fw-bold mx-auto">@{data?.username}</span>
          <div className="d-grid gap-2">
            <span className="followers mx-auto">
              {data?.followers.length} seguidores
            </span>
            <span className="following mx-auto">
              {data?.following.length} seguidos
            </span>
          </div>
          <span className="follow mx-auto">
            {data?.id === userId ? "" : <FollowButton />}
          </span>
        </div>
      </div>

      {/* Inicio modal */}
      <div
        className="modal"
        tabIndex="-1"
        id="editProfileModal"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Perfil</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="profile-image-upload text-center mb-3">
                <label htmlFor="profileImageInput">
                  {formData?.profile_image ? (
                    <img
                      src={formData?.profile_image}
                      alt="User profile"
                      className="profile-img rounded-circle"
                      style={{
                        cursor: "pointer",
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  ) : data?.profile_image ? (
                    <img
                      src={data?.profile_image}
                      alt="User profile"
                      className="profile-img rounded-circle"
                      style={{
                        cursor: "pointer",
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  ) : (
                    <Avvvatars
                      value={data?.username}
                      size={150}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  Cambia tu foto de perfil
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  onChange={handleFile}
                  style={{ display: "none" }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">Háblales de ti</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="socialLinks">Redes Sociales</label>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="X"
                  name="x"
                  value={formData.x}
                  onChange={handleSocialChange}
                />

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleSocialChange}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleSocialChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fin modal */}
    </>
  );
};

export default ProfileCard;
