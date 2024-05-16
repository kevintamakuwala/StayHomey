import React, { useState } from "react";
import "./PhotoGallery.css";

const PhotoGallery = (props) => {
  const place = props.place;
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="gallery-container">
        <div className="gallery-parent">
          <div className="gallery-top">
            <button onClick={() => setShowAllPhotos(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="gallery-bottom">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index}>
                  <img src={photo} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="photos-container">
        <div className="main-photo">
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="extra-photos-container">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              src={place.photos[1]}
              alt=""
            />
          )}
          <div className="third-photo-container">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={place.photos[2]}
                alt=""
              />
            )}
            <div className="fourth-photo-container">
              {place.photos?.[3] ? (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={place.photos[3]}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={place.photos[0]}
                  alt=""
                />
              )}
              <button onClick={() => setShowAllPhotos(true)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
