import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { useParams } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6IjMzNjFkNjYyMzc5YjJjMDU2ZmQwY2NmMDU2ZjhiNjMwMzBlZmZjYmI3NjNmM2ZlZDU4YjJmOGI5YzNiOGYzYzA1M2QwMGU2MmEzYTNkNGJlIiwiaWF0IjoxNTk1ODAwNzU5LCJuYmYiOjE1OTU4MDA3NTksImV4cCI6MTU5NTgwNDM1OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.yoxs6AqS8_j8a3lI8rk-tgeUpdtUclAILcoNQAue4qqj8XyjK-KszDVBhjyfa66mv4RnHRtv1TOKL5I8vXrsZefzf3hlzLAqsMmbt0cgJs3qNSumjCQ1FZIh7emx_wWkrZTudsv6W9zc9m5wgfjhY7F7DpHgtWtIYmcYjKUJekLDUV7YpiNnNEshEcoJTOO8JNloBAut4d1shLGhd-HfI83MwakQqfM5FJ1iWgdNgqXnTsSpcYNizcjDsTSIvbVQOfiuEBwUsmO7iU1IAO3LTCizV5dqbKL2ibRMpZSkYcMFKoi5p4Mdu-PE0WI0RyIkqBxdR58mOGV7wCdALBEDlQ";

export default function AdoptionDetail() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [shelterId, setShelterId] = useState();
  const [shelterContact, setShelterContact] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      // Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  useEffect(() => {
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
    if (shelterId) {
      axios
        .get(`https://api.petfinder.com/v2/organizations/${shelterId}`, config)
        .then((res) => {
          console.log(res.data.organization);
          setShelterContact(res.data.organization);
        });
    }
  }, [shelterId]);

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
    Safehome animal rescue
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
  return (
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
          {/* profile body                */}

          <section className="adoptionDetail__body">
            <section className="adoptionDetail__shelter adoptionDetail__card">
                {renderContact}
              {/* <h1 className="adoptionDetail__shelter-heading">
                Shelter / Rescue Group
              </h1>
              <h5 className="adoptionDetail__shelter-name">
                Safehome animal rescue
              </h5>

              <section className="adoptionDetail__shelter-contact">
                <img
                  src={require("../../assets/SVG/location.svg")}
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__location">
                  169 Finch ave e, Toronto, ON
                </div>
              </section>

              <section className="adoptionDetail__shelter-contact">
                <img
                  src={require("../../assets/SVG/location.svg")}
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__location">
                  http://169rescuecat.com
                </div>
              </section>
              <section className="adoptionDetail__shelter-contact">
                <img
                  src={require("../../assets/SVG/Icon-email.svg")}
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__email">rescue@gmail.com</div>
              </section>
              <section className="adoptionDetail__shelter-contact">
                <img
                  src={require("../../assets/SVG/Icon-phone.svg")}
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__phone">123-456-789</div>
              </section> */}


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
  );
}
