import React, { useState } from "react";
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import CatSearch from "../CatSearch/CatSearch";
import "./style.scss";



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
 

  return (
    <div className="homePage">
      {/* Navigation bar */}
      {/* Hero section */}
      <section className="homePage__hero hero">
        {/* Left */}
        <section className="hero__left">
        <Fade right duration={1200} >
          <h1 className="hero__heading">
            Buying a cat? Why not adopt from us instead?
          </h1>
          </Fade>

          {/* search */}

          <CatSearch
            searchText={(text) => setSearchTerm(text)}
            homePageSearchTerm={searchTerm}
          />

          {/* subheading */}
          <Fade right cascade duration={1200}>
          <section className="hero__subheading">

            <section className="hero__subheadingItem hero__subheadingItemOne">
              <img
                src="./assets/Icon-hand-holding-heart.svg"
                alt="An icon of a hand holding heart"
                className="hero__subheadingIcon"
              />
              <p className="hero__subheadingText">
                Are you starting the search for loving companion? Why not
                adopting with us?
              </p>
            </section>



            <section className="hero__subheadingItem hero__subheadingItemTwo">
              <img
                src="./assets/Icon-cat.svg"
                alt="An icon of a cat"
                className="hero__subheadingIcon"
              />
              <p className="hero__subheadingText">
                You will receive four weeks free Petplan insurance
              </p>
            </section>

          </section>
          </Fade>

        </section>

        <section className="hero__right">
          <Bounce right cascade duration={1800}>
          <div className="img__container">
          <img
            className="img__cat"
            src={require("../../assets/hero/cat.svg")}
            alt="black cat"
            />
          <img
            className="img__bubble1"
            src={require("../../assets/hero/bubble1.svg")}
            alt="bubble"
          />
          <img
            className="img__bubble2"
            src={require("../../assets/hero/bubble2.svg")}
            alt="bubble"
          />
          <img
            className="img__bubble3"
            src={require("../../assets/hero/bubble3.svg")}
            alt="bubble"
          />
          <img
            className="img__bubble4"
            src={require("../../assets/hero/double.svg")}
            alt="bubble"
          />

          {/* <img
            src="./assets/cat-hero-bubble.png"
            alt=""
            className="hero__img"
          /> */}
          </div>
          </Bounce>

        </section>
      </section>
    </div>
  );
}
