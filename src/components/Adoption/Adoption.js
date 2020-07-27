import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import "./style.scss";
import { Pagination } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { InputPicker } from "rsuite";
import { Icon } from "rsuite";
import { TagPicker } from "rsuite";
import breed from "../../data/breed.json";
import color from "../../data/color.json";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6IjU2NGIyODgwZjk3YTJhNTIxMzdjM2Y5OWRkNWY0MGI5OGFlZjQwOGNlZDQ0YTg3MzNlY2M2Y2RjZDk1ODUzZjY2NTA4NmFkNTE4MmI1NGQ4IiwiaWF0IjoxNTk1ODE2MTE1LCJuYmYiOjE1OTU4MTYxMTUsImV4cCI6MTU5NTgxOTcxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.dr64l_pYIh8J2EFgkOLablO0VSvUq7L2bwBXtZt7h8XMjxYHghoGGSKFdo9Z3LRkfCD44ueKyEphIeydH0pzdeACcDQn19f6iF5KqvAf63FQu25PbnsJnUJcmFaVwC7OKp-W1LcO8uUnB2ypDMBVC6CE495UsqX6fwmjlISOqXA57xq99iCbzyfJdwGaxp6w6T9goqoWAJjTnYnl3W13n9a0xrRMabID3YvW0GA-x-aciAP2bYMSq-fwtAySExy13d-cAO6FA5-IroQU3x1UKM52tqAKTDEvzpqCad98-IMPBT0xlEmQkGLPj6ezQ3oGVIy61WOIeMn6HsWAGtqvrg";

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
  width: "100%",
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
  const location = useLocation();
  const homePageSearchTerm = location.state ? (location.state.searchTerm.homePageSearchTerm):(undefined);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState(homePageSearchTerm?(homePageSearchTerm):('toronto, on'));
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [locationQuery, setLocationQuery] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goodWithChildren, setGoodWithChildren] = useState();
  const [goodWithDogs, setGoodWithDogs] = useState();
  const [goodWithCats, setGoodWithCats] = useState();



  useEffect(() => {
    
    const goodCatsQuery = goodWithCats === true ? "&good_with_cats=true" : "";
    const goodDogsQuery = goodWithDogs === true ? "&good_with_dogs=true" : "";
    const goodChildrenQuery =
      goodWithChildren === true ? "&good_with_children=true" : "";

    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=cat&sort=distance&limit=21&page=${activePage}&location=${searchTerm}&breed=${breed}&gender=${gender}&color=${color}&age=${age}${goodCatsQuery}${goodDogsQuery}${goodChildrenQuery}`,
        config
      )
      .then((res) => {
        setTotalCount(res.data.pagination.total_count);
        setResult(res.data.animals);
        setTotalPage(res.data.pagination.total_pages);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          const errorStatus = error.response.status;
          if (errorStatus === 400) {
            setErrorMessage(
              `Could not determine location. Please use format 'city, state' or postal code`
            );
          } else {
            setErrorMessage("Token expired");
          }
          setResult([]);
        }
      });
  }, [
    searchTerm,
    breed,
    color,
    age,
    gender,
    goodWithChildren,
    goodWithCats,
    goodWithDogs,
    activePage,
  ]);

  const handleClick = (e) => {
    e.preventDefault();
    setSearchTerm(locationQuery);
  };

  const handleChange = (value) => {
    setLocationQuery(value.toLowerCase());
  };

  return (
    
    <>
      <div className="adoptionSearch">
        <div className="adoptionSearch__hero">
          <section className="adoptionSearch__heading">
            <h1 className="adoptionSearch__heading-main">
              We're here for them

            </h1>
            <h2 className="adoptionSearch__heading-second">
              They're always there for you
            </h2>
          </section>
          {/* Search Form */}
          <section className="adoptionSearch__input">
            <InputGroup inside style={styles} size="lg">
              <Input style={inputStyle} size="lg" onChange={handleChange} placeholder='Search for "city, state" or postal code'/>
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
                <div className="container">
                  You have found{" "}
                  <span className="highlight"> {totalCount} </span>
                  listings for cats available near
                  <span className="highlight"> {searchTerm}</span>
                </div>
              </h2>
            )}
          </div>
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
                onChange={(value, event) => {
                  if (value !== null) {
                    setBreed(value.join());
                  } else setBreed();
                }}
                name="breed"
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Color</h5>
              <InputPicker
                data={colorTags}
                style={{ width: "100%" }}
                placeholder="Any"
                size="md"
                onChange={(value, event) => {
                  setColor(value);
                }}
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Age</h5>

              <TagPicker
                size="md"
                data={ageTags}
                style={{ width: "100%" }}
                placeholder="Any"
                onChange={(value, event) => {
                  setAge(value);
                }}
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Gender</h5>

              <TagPicker
                size="md"
                data={genderTags}
                style={{ width: "100%" }}
                placeholder="Any"
                onChange={(value, event) => {
                  setGender(value);
                }}
              />
            </section>

            <section className="adoptionSearch__tagGroup">
              <h5>Good with</h5>

              <TagPicker
                size="md"
                data={goodTags}
                style={{ width: "100%" }}
                placeholder="Any"
                onChange={(value, event) => {
                  if (value.indexOf("children") !== -1) {
                    setGoodWithChildren(true);
                  } else {
                    setGoodWithChildren();
                  }
                  if (value.indexOf("dogs") !== -1) {
                    setGoodWithDogs(true);
                  } else {
                    setGoodWithDogs();
                  }
                  if (value.indexOf("cats") !== -1) {
                    setGoodWithCats(true);
                  } else {
                    setGoodWithCats();
                  }
                }}
              />
            </section>
          </section>

          <section className="adoptionSearch__result">
            {/* loading */}
            {!isLoading && result.length === 0 && (
              <h1 className="adoptionSearch__notFound">No cats found...</h1>
            )}

            {/* render cat */}

            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="adoptionSearch__container">
                {result.map((cat) => (
                <Link key={cat.id} to={`/adoption/${cat.id}`}>
                  <Card cat={cat} />
                </Link>
                ))}
              </div>
            )}

            <div className="adoptionSearch__pagination">
              {result.length !== 0 && !isLoading && (
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  activePage={activePage}
                  onSelect={(eventKey) => setActivePage(eventKey)}
                  pages={totalPage}
                  maxButtons={5}
                  size="lg"
                />
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
