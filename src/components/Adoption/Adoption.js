import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./style.scss";
import { Input, InputGroup } from "rsuite";
import { InputPicker } from "rsuite";
import { Icon } from "rsuite";
import { TagPicker } from "rsuite";
import breed from "../../data/breed.json";
import color from "../../data/color.json";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6IjJjYThhMDNjMDA3ZDU3NjBlNzliNGNjNGFiYmQwN2NhZGUwOGRkMmViZmY5ZTYxYmE2YzNiOGE2MzQxODU4NTc1ODA3MTlkYTJhZDFkMWM2IiwiaWF0IjoxNTk1NTYxNjUyLCJuYmYiOjE1OTU1NjE2NTIsImV4cCI6MTU5NTU2NTI1Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.pa67M9SBtXC-UpW7Wdq18RP878jW8ejY-W6oKj7VRgCDyA0BKLpcs00nsoan-Vgwu_YXi2v9hkEDR6X7SWC09WPeUCKE1PUv1uLOFbsUegaglc5uni0g2PCRuTf7gW0zmwvAD-bvNYMnTCtrREnXSqrx1U7jQ_03g2VmPEXzY2tSLwocYd1k_lHlkT_Nr-3IDeI8VD6C24_n4JwU-xC5brUWPdn6wfNA54HGG9yJ-1iqjROa3F_vl8jjzymMJb4Jg1XDMRmPUHzAge5nqN2003k4CJfE_Pz_c4X4n5yHokwdMg493NMBRqpw3yitZIqg3jQn35Y-_fNsg47URA1NTw";

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
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goodWithChildren, setGoodWithChildren] = useState();
  const [goodWithDogs, setGoodWithDogs] = useState();
  const [goodWithCats, setGoodWithCats] = useState();

  useEffect(() => {
      const goodCatsQuery = goodWithCats===true ? ('&good_with_cats=true'):('')
      const goodDogsQuery = goodWithDogs===true ? ('&good_with_dogs=true'):('')
      const goodChildrenQuery = goodWithChildren===true ? ('&good_with_children=true'):('')
    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=cat&sort=distance&limit=21&page=1&location=${searchTerm}&breed=${breed}&gender=${gender}&color=${color}&age=${age}${goodCatsQuery}${goodDogsQuery}${goodChildrenQuery}`,
        config
      )
      .then((res) => {
        console.log(res.data.animals);
        setTotalCount(res.data.pagination.total_count);
        setResult(res.data.animals);
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
  }, [searchTerm, breed, color, age, gender, goodWithChildren, goodWithCats, goodWithDogs]);

  

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
              <div className="container">
                You have found <span className="highlight"> {totalCount} </span>
                listings for cats available in 
                <span className="highlight"> {searchTerm}</span>
              </div>
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
                onChange={(value, event) => {
                  setBreed(value.join());
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
                if (value.indexOf('children')!==-1){
                    setGoodWithChildren(true);
                }else{
                    setGoodWithChildren()
                }
                if(value.indexOf('dogs')!==-1){
                    setGoodWithDogs(true)
                }else{
                    setGoodWithDogs()
                }
                if (value.indexOf('cats')!==-1){
                    setGoodWithCats(true)
                } else{
                    setGoodWithCats()
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
