import React, { useState , useEffect} from "react";
import Nav from '../Nav/Nav';
import NavMenu from '../NavMenu/NavMenu'
import CatSearch from '../CatSearch/CatSearch'
import "./style.scss";
import "rsuite/dist/styles/rsuite-default.css";


const bodyParameters = {
  key: "value"
};

const styles = {
  width: "70%",
};
const buttonStyle = {
  backgroundColor: "#D775A3",
  fontFamily:'Roboto',
  fontWeight:700
};


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleClick(e) {
    e.preventDefault();
    console.log("clicked");
  }
  function handleChange(value) {
    setSearchTerm(value);
  }

 
  
  return (
    <div className="homePage">
      {/* Navigation bar */}
      {/* Hero section */}
      <section className="homePage__hero hero">
        {/* Left */}
        <section className="hero__left">
          <h1 className="hero__heading">
            Buying a cat? Why not adopt from us instead?
          </h1>

          {/* search */}
          
             <CatSearch searchText={(text) => setSearchTerm(text)} homePageSearchTerm={searchTerm}/>

          {/* subheading */}
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
        </section>

        <section className="hero__right">
          <img
            src="./assets/cat-hero-bubble.png"
            alt=""
            className="hero__img"
          />
        </section>
      </section>
    </div>
  );
}
