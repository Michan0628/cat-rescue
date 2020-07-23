import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";
import "./style.scss";
import { Input, InputGroup } from "rsuite";
import { Icon } from "rsuite";
import Select from 'react-select'
import breed from '../../data/breed.json'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
  
const breedTags = breed.map(item=>(
    {
        'label':item.name,
        'value':item.name
    }
))
const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
};

const styles = {
  width: "50%",
  marginBottom: 10,
};
const inputStyle = {
  fontFamily: "Raleway",
  fontSize: 20,
};
const buttonStyle = {
  height: "100%",
};

export default function Adoption() {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=cat&sort=distance&location=toronto, on`,
        config
      )
      .then((res) => {
        console.log("this is animals", res.data.animals);
        console.log("this is pagination", res.data.pagination);
        setResult(res.data.animals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("axios error", error);
        console.log(breedTags);
      });
  }, [searchTerm]);

  return (
    <div className="adoptionSearch">
      <section className="adoptionSearch__heading">
        <h1 className="adoptionSearch__heading-main">We're here for them</h1>
        <h2 className="adoptionSearch__heading-second">
          They're always there for you
        </h2>
      </section>
      {/* Search Form */}
      <section className="adoptionSearch__input">
        <InputGroup inside style={styles}>
          <Input style={inputStyle} />
          <InputGroup.Button style={buttonStyle}>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
        {/* selection */}
        <Select
        className='selectBreed'
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={breedTags}
    />
      </section>
      {/* Search Result */}
      <section className="adoptionSearch__result">
        {/* loading */}
        {!isLoading && result.length === 0 && <h1>No cats found...</h1>}
        {/* render cat */}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="adoptionSearch__container">
            {result.map((cat) => (
              <Card key={cat.id} cat={cat} />
            ))}
          </div>
        )}
      </section>
      <div className="pagination">
        <button className="previous">Previous Page</button>
        <button className="next">Next Page</button>
      </div>
    </div>
  );
}
