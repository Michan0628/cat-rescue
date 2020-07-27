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
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6ImNmNDBjOWJjYWRlZmFhNzdiZjFmNDczODQxMTVlMGM4ZTRiMzIzMWVmYjhkMzVlMTcyMzBkNTA4ODYyMGUwNDAxMWI1ODhiM2FiNWYxZDgyIiwiaWF0IjoxNTk1ODM1NDMzLCJuYmYiOjE1OTU4MzU0MzMsImV4cCI6MTU5NTgzOTAzMywic3ViIjoiIiwic2NvcGVzIjpbXX0.XjsIeqewUnkxeIuaxpb-8nQzDZGHOQpPaekx40XRfLER6bYc5Gqh543VzT2wVqef3y-VDDoapElPri3ljl4sP5Axv0eiZ2Gcrpx_5IfTBBgHkB7f52mfywOzWoaRV-twSWiPhq3fJuUaZRlyWjT44KgnCdJ_oEb4Hfhy4yfpoNKg0oBKrqZj0QGWv6qM64ZrKqaAykO2MF5URiQSfvqRo5YOXNg8AhjYXTh3Bp5C4ysB5ohSd4f3yyZz0NIOo96YKZBPO_Mm91NQiDeZ5C_Zu41YUe2Yb0IpW8nLAQwMnLuhKfYr3BRdmv-39argCuMbP7OCsl-FAORZs9N0at06MQ";

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
  const [result, setResult] = useState([])
  const [searchTerm, setSearchTerm] = useState(homePageSearchTerm?(homePageSearchTerm):(sessionStorage.getItem('sessionStorageResult')|| 'toronto, on'));
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
    // session storage

    sessionStorage.setItem('sessionStorageResult', searchTerm);

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

  const handleKeyUp=(e)=>{
    if(e.key==='Enter'){
      document.getElementById('searchPageButton').click()
    }
  }
  
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
              <Input style={inputStyle} size="lg" onChange={handleChange} placeholder='Search for "city, state" or postal code' onKeyUp={handleKeyUp}/>
              <InputGroup.Button id='searchPageButton' style={buttonStyle} onClick={handleClick}>
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
