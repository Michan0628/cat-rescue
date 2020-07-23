import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./style.scss";
import { Input, InputGroup } from "rsuite";
import { Icon } from "rsuite";
import { TagPicker } from "rsuite";
import breed from "../../data/breed.json";
import color from "../../data/color.json";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6ImE1YWIxNjRjYjZmODBlOGNjY2I4MTFjNDliNGE3MThlYjQ4MTc4ZWNhZmY0Y2QwNzI2MGY2NTY5NzFkMGJkYmFhY2UxNTZlMTdiYTNjZDg0IiwiaWF0IjoxNTk1NTM1MTMwLCJuYmYiOjE1OTU1MzUxMzAsImV4cCI6MTU5NTUzODczMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.WcromHincSHsMkcvlPplSr4o3RMItkl0zX55WnCfojnCAUSqkmMTrOQLmxU5MMhek5XtzLncORnqLpS0CRB3fvBdnglBqB5X9DRaCE-UXAMhWXElwEvaMN4-xFM5FV_HrJuDk3qC9dVIDAtFP5J5zwsqVRL8nZYBEH25P4rZwHoeK3W3s_hZLBJxZbvsVYeQE7LxcnMGikb0qCewEpUZceSln4Q3wlCzvgwuv7BnZPMrJCSbfKjUi4b-Q20qHUZrNGDcCAcvka7QBRj4w_QD0aPCWkFEmxumAanx6JJCIZVdt0BSDI8F3YuQFVb8EkEhZOsGo3QTD_YeZynUCyTvnA";

// tags data
const breedTags = breed.map((item) => ({
  label: item.name,
  value: item.name,
}));

const colorTags = color.map((item) => ({
  label: item,
  value: item,
}));

const genderTags = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const ageTags = [
  { label: "Kitten", value: "kitten" },
  { label: "Young", value: "young" },
  { label: "Adult", value: "adult" },
  { label: "Senior", value: "senior" },
];

const goodTags = [
  { label: "Children", value: "children" },
  { label: "Dogs", value: "dogs" },
  { label: "Cats", value: "cats" },
];

// config for axios
const config = {
  headers: {
    // Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    Authorization: `Bearer ${TOKEN}`,
  },
};
// style for form input
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
  const [searchTerm, setSearchTerm] = useState("toronto, on");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [locationQuery, setLocationQuery] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=cat&sort=distance&limit=21&page=1&location=${searchTerm}`,
        config
      )
      .then((res) => {
        setTotalCount(res.data.pagination.total_count);
        setResult(res.data.animals);
        setIsLoading(false);
        setErrorMessage('')
      })
      .catch((error) => {
          if(error.response){
              const errorStatus =  error.response.status; 
              if (errorStatus=== 400) {
                setErrorMessage(
                  'Could not determine location. Please use format "city, state" or postal code'
                );
          }else{
              setErrorMessage(
                  'Token expired'
              )
          }
          setResult([]);
        }
      });
  }, [searchTerm]);

  const handleClick = (e) => {
    e.preventDefault();
    setSearchTerm(locationQuery);
  };

  const handleChange = (value) => {
    setLocationQuery(value.toLowerCase());
  };
  return (
    <>
      <Nav />
      <div className="adoptionSearch">
        <section className="adoptionSearch__heading">
          <h1 className="adoptionSearch__heading-main">We're here for them</h1>
          <h2 className="adoptionSearch__heading-second">
            They're always there for you
          </h2>
        </section>
        {/* Search Form */}
        <section className="adoptionSearch__input">
          <InputGroup inside style={styles} size="lg">
            <Input style={inputStyle} size="lg" onChange={handleChange} />
            <InputGroup.Button style={buttonStyle} onClick={handleClick}>
              <Icon icon="search" />
            </InputGroup.Button>
          </InputGroup>
        </section>
        {/* error message */}
        <div className="adoptionSearch__errorMessage">
          {errorMessage ? (
            <h5>{errorMessage}</h5>
          ) : (
            <h2 className="adoptionSearch__heading adoptionSearch__heading-third">
              You have found {totalCount} listings for cats available in{" "}
              {searchTerm}.
            </h2>
          )}
        </div>
        {/* Search Result */}
        <section className="adoptionSearch__body">
          {/* Tags */}
          <section className="adoptionSearch__tags">
            <section className="adoptionSearch__tagGroup">
              <h5>Breed</h5>
              <TagPicker
                size="md"
                data={breedTags}
                style={{ width: "100%" }}
                placeholder="Any"
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Color</h5>

              <TagPicker
                size="md"
                data={colorTags}
                style={{ width: "100%" }}
                placeholder="Any"
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Age</h5>

              <TagPicker
                size="md"
                data={ageTags}
                style={{ width: "100%" }}
                placeholder="Any"
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Gender</h5>

              <TagPicker
                size="md"
                data={genderTags}
                style={{ width: "100%" }}
                placeholder="Any"
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Good with</h5>

              <TagPicker
                size="md"
                data={goodTags}
                style={{ width: "100%" }}
                placeholder="Any"
              />
            </section>
          </section>

          <section className="adoptionSearch__result">
            {/* loading */}
            {!isLoading && result.length === 0 && <h1 className='adoptionSearch__notFound'>No cats found...</h1>}

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
        </section>
      </div>
    </>
  );
}
