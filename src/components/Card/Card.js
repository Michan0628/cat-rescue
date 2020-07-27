import React from "react";
import "./style.scss";

export default function Card({ cat }) {
  const photo = cat.primary_photo_cropped;
  return (
    <>
      <section className="adoptionSearch__card card">
        {/* If there is no photo then show default photo */}
        {photo == null ? (
          <img
          
          src={require("../../assets/photo/anton-lochov-_b020HIGZUE-unsplash.jpg")}
            alt="deafult blackCat"
            className="card__photo"
          />
        ) : (
          <img
            src={photo.medium}
            alt="Cat main profile"
            className="card__photo"
          />
        )}

        <section className="card__body">
          <h5 className="card__name hvr-bounce-to-right">{cat.name}</h5>
          <div className="card__breed">{cat.breeds.primary}</div>
          <div className="card__location">
            {cat.contact.address.city}, {cat.contact.address.state}
          </div>
          <div className="card__learnMore">
            <div>Learn More</div>
            <img
 src={require("../../assets/SVG/arrow.svg")}
              alt="blue arrow"
              className="card__learnMoreIcon"
            />
          </div>
        </section>
      </section>
    </>
  );
}
