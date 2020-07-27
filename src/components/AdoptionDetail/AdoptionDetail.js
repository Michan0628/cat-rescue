import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from '../Card/Card'
import "./style.scss";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6ImZhMmYzMTA2ZGU1MDY5Y2ViYmQ3ZmMzMjM3OWJlZDY0MzE0OTlhNTc3YmQ0YmJmNjc1MjBlNDhkYThhNTY0ZmI1MGIzY2RiZWJhNzZkNjUxIiwiaWF0IjoxNTk1ODIyNzk1LCJuYmYiOjE1OTU4MjI3OTUsImV4cCI6MTU5NTgyNjM5NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.q3K9llLKqfUeCnFpBn1bcgjYH97oDs_PpcEXahwV1qWR81gXt-92cAyF0CvdT49ZTyyyD4Qbf9sHJpqYWV06TahLgHfCOG5mbtcfxhuEzPUbI6jw54erqgKkVyMz2X9KdfKg1LTcMVqS2gano3dAvbDD9IKsyz-I0Siw5ozAMKGgSHd7uUjzP2nV5YsypdJkXD3dyXIxnwSeRv0Kb47mKJYu-I5VDAy0Fv_yy4snqcTA5fPxfoMv_XL1XU82m_LXDzVnzaQv5PtBmQ4l5IwM6X75Y_rr2aW1-HdEhmcCmJlEAFVghmV9Av-G_IFEZLOO09O7fOfEHJ2KJW0gifCVVQ";

export default function AdoptionDetail() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [shelterId, setShelterId] = useState();
  const [shelterContact, setShelterContact] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recommend, setRecommend] = useState()

  const config = {
    headers: {
      // Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  useEffect(() => {
    // get cat profile 
    axios
      .get(`https://api.petfinder.com/v2/animals/${id}`, config)
      .then((res) => {
        console.log(res.data.animal);
        console.log(
          "name is",
          res.data.animal.name,
          "color:",
          res.data.animal.colors,
          "age is",
          res.data.animal.age
        );

        setData(res.data.animal);
        setShelterId(res.data.animal.organization_id);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          const errorStatus = error.response.status;
          if (errorStatus === 400) {
            setErrorMessage(
              `Could not determine location. Please use format 'city, state' or postal code`
            );
            setIsLoading(true);
          } else {
            setErrorMessage("Token expired");
          }
          setData([data]);
        }
      });

    // get shelter contact info
    if (shelterId) {
      axios
        .get(`https://api.petfinder.com/v2/organizations/${shelterId}`, config)
        .then((res) => {
          console.log(res.data.organization);
          setShelterContact(res.data.organization);
        });
        // get recommend cats
        axios.get(
          `https://api.petfinder.com/v2/animals?limit=4&organization=${shelterId}`,
          config
        ).then((res)=>{
          setRecommend(res.data.animals);
        })
    }

  
    
  }, [id,  shelterId]);

//   render cat color and breed
  const color = data ? data.colors.primary : "";
  const breed = data ? data.breeds.primary : "";


// Render shelter contact card
  const renderContact = shelterContact ? (
      <>
    <h1 className="adoptionDetail__shelter-heading">
    Shelter / Rescue Group
  </h1>
  <h5 className="adoptionDetail__shelter-name">
    {shelterContact.name}
  </h5>

  <section className="adoptionDetail__shelter-contact">
    <img
      src={require("../../assets/SVG/location.svg")}
      alt=""
      className="adoptionDetail__shelter-icon"
    />
    <div className="adoptionDetail__location">
        {shelterContact.address.address1} - {shelterContact.address.city} - {shelterContact.address.state} - {shelterContact.address.postcode}
    </div>
  </section>

  <section className="adoptionDetail__shelter-contact">
    <img
      src={require("../../assets/SVG/globe.svg")}
      alt=""
      className="adoptionDetail__shelter-icon"
    />
    <div className="adoptionDetail__location">
    {shelterContact.website === null ? ('null'):(shelterContact.website)}
    </div>
  </section>
  <section className="adoptionDetail__shelter-contact">
    <img
      src={require("../../assets/SVG/Icon-email.svg")}
      alt=""
      className="adoptionDetail__shelter-icon"
    />
    <div className="adoptionDetail__email">{shelterContact.email === null ? ('null'):(shelterContact.email)}</div>
  </section>
  <section className="adoptionDetail__shelter-contact">
    <img
      src={require("../../assets/SVG/Icon-phone.svg")}
      alt=""
      className="adoptionDetail__shelter-icon"
    />
    <div className="adoptionDetail__phone">{shelterContact.phone}</div>
  </section>
</>
  ):(
      <h5 className='adoptionDetail__isLoading'>Loading...</h5>
  );

  // Render recommen list
  const renderRecommend = shelterContact && recommend ? (
    <>
    <h1 className="recommend__heading">
      Other Cats from <span className='recommend__highlight hvr-bounce-to-right'>
        {shelterContact.name}
        </span>
    </h1>

    <section className="recommend__list">
      

        {recommend.map((cat) => (
        <Link style={{textDecoration:'none'}}key={cat.id} to={`/adoption/${cat.id}`}>
          <Card cat={cat} />
        </Link>
        ))}

      
    </section>
      </>
  ):(
    <h5 className="recommend__loading">
      Loading...
    </h5>
  )
  return (
    <>
    <section className="adoptionDetail">
      {/* render cat */}

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="adoptionDetail__container">
          <section className="adoptionDetail__hero">
            <section className="adoptionDetail__hero-left">
              <div className="slider"></div>
            </section>
            <section className="adoptionDetail__hero-right">
              <div className="adoptionDetail__card adoptionDetail__card-greeting">
                <h5 className="adoptionDetail__greeting">Hi! I'm</h5>
                <h1 className="adoptionDetail__name">{data.name}</h1>
                <section className="adoptionDetail__info">
                  <div>
                    {color}- {data.gender} - {data.age} - {data.status}
                  </div>
                  <div>
                    {breed} - {data.contact.address.city}{" "}
                    {data.contact.address.state}
                  </div>
                </section>
                <section className="adoptionDetail__tags">
                  <TagGroup style={{ marginRight: "1rem" }}>
                    {/* render tag */}
                    {data.tags === null ? (
                      <div></div>
                    ) : (
                      data.tags.map((item, index) => (
                        <div key={index}>
                          <Tag
                            style={{
                              backgroundColor: "#D775A3",
                              color: "white",
                            }}
                          >
                            {item}
                          </Tag>
                        </div>
                      ))
                    )}
                  </TagGroup>
                </section>
              </div>
            </section>
          </section>
          {/* profile body  */}

          <section className="adoptionDetail__body">
            <section className="adoptionDetail__shelter adoptionDetail__card">
                {renderContact}
            </section>
            <section className="adoptionDetail__story adoptionDetail__card">
              <h1 className="adoptionDetail__story-heading">My Story</h1>
              <div className="adoptionDetail__story-body">
                {data.description}
              </div>
            </section>
          </section>
        </div>
      )}
    </section>
  
    <section className="recommend">
    {renderRecommend}
    
     
      
    </section>
    </>
  );
}
