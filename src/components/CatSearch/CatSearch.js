import React from "react";
import {Link} from "react-router-dom";
import { Button } from "rsuite";
import { Input } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

const styles = {
  width: "70%",
};
const buttonStyle = {
  backgroundColor: "#D775A3",
  fontFamily: "Roboto",
  fontWeight: 700,
};

export default function CatSearch({ searchText, homePageSearchTerm}) {

const handleKeyUp=(e)=>{
  if(e.key==='Enter'){
    document.getElementById('homeSearchButton').click()
  }
}
const handleChange = (value)=>{
  searchText(value)
}
  return (
    <section className="hero__search search">
      <Input
        className="search__input"
        style={styles}
        placeholder="Try 'Toronto, ON'"
        onChange={handleChange}
        onKeyUp={handleKeyUp}

      />
      <Link to={{
        pathname:'/adoption',
        state:{searchTerm: {homePageSearchTerm}}
      }}>
      <Button
      id='homeSearchButton'
        className="search__button"
        style={buttonStyle}
        appearance="primary"
        >
        Get Started
      </Button>
        </Link>
    </section>
  );
}
