import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import Card from "../Card/Card";
import { Tag, TagGroup } from "rsuite";
// photo carousel
import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/src/core/styles.scss';


const TOKEN =
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6ImNmNDBjOWJjYWRlZmFhNzdiZjFmNDczODQxMTVlMGM4ZTRiMzIzMWVmYjhkMzVlMTcyMzBkNTA4ODYyMGUwNDAxMWI1ODhiM2FiNWYxZDgyIiwiaWF0IjoxNTk1ODM1NDMzLCJuYmYiOjE1OTU4MzU0MzMsImV4cCI6MTU5NTgzOTAzMywic3ViIjoiIiwic2NvcGVzIjpbXX0.XjsIeqewUnkxeIuaxpb-8nQzDZGHOQpPaekx40XRfLER6bYc5Gqh543VzT2wVqef3y-VDDoapElPri3ljl4sP5Axv0eiZ2Gcrpx_5IfTBBgHkB7f52mfywOzWoaRV-twSWiPhq3fJuUaZRlyWjT44KgnCdJ_oEb4Hfhy4yfpoNKg0oBKrqZj0QGWv6qM64ZrKqaAykO2MF5URiQSfvqRo5YOXNg8AhjYXTh3Bp5C4ysB5ohSd4f3yyZz0NIOo96YKZBPO_Mm91NQiDeZ5C_Zu41YUe2Yb0IpW8nLAQwMnLuhKfYr3BRdmv-39argCuMbP7OCsl-FAORZs9N0at06MQ";

export default function AdoptionDetail() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [shelterId, setShelterId] = useState();
  const [shelterContact, setShelterContact] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recommend, setRecommend] = useState();

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
          console.log(errorMessage)
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
      axios
        .get(
          `https://api.petfinder.com/v2/animals?type=cat&limit=4&organization=${shelterId}`,
          config
        )
        .then((res) => {
          setRecommend(res.data.animals);
        });
    }
  }, [id, shelterId]);

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
        <span className='hvr-bounce-to-right'>
        {shelterContact.name}
        </span>
        </h5>

      <section className="adoptionDetail__shelter-contact">
        <img
          src={require("../../assets/SVG/location.svg")}
          alt=""
          className="adoptionDetail__shelter-icon"
        />
        <div className="adoptionDetail__location">
          {shelterContact.address.address1} - {shelterContact.address.city} -{" "}
          {shelterContact.address.state} - {shelterContact.address.postcode}
        </div>
      </section>

      <section className="adoptionDetail__shelter-contact">
        <img
          src={require("../../assets/SVG/globe.svg")}
          alt=""
          className="adoptionDetail__shelter-icon"
        />
        <div className="adoptionDetail__location">
          {shelterContact.website === null ? (
            "null"
          ) : (
            <a
              className="adoptionDetail__shelter-website hvr-bounce-to-right"
              href={shelterContact.website}
            >
              {shelterContact.website}
            </a>
          )}
        </div>
      </section>
      <section className="adoptionDetail__shelter-contact">
        <img
          src={require("../../assets/SVG/Icon-email.svg")}
          alt=""
          className="adoptionDetail__shelter-icon"
        />
        <div className="adoptionDetail__email">
          {shelterContact.email === null ? "null" : shelterContact.email}
        </div>
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
  ) : (
    <h5 className="adoptionDetail__isLoading loading__shelter">Loading...</h5>
  );

  // Render recommen list
  const renderRecommend =
    shelterContact && recommend ? (
      <>
        <h1 className="recommend__heading">
          Other Cats from{" "}
          <span className="recommend__highlight hvr-bounce-to-right">
            {shelterContact.name}
          </span>
        </h1>

        <section className="recommend__list">
          {recommend.map((cat) => (
            <Link
              style={{ textDecoration: "none" }}
              key={cat.id}
              to={`/adoption/${cat.id}`}
            >
              <Card cat={cat} />
            </Link>
          ))}
        </section>
      </>
    ) : (
      <h5 className="recommend__loading loading__recommend">Loading...</h5>
    );
  return (
    <>
      <section className="adoptionDetail">
        {/* render cat */}

        {isLoading ? (
          <h1 className='loading__profile'>Loading...</h1>
        ) : (
          <div className="adoptionDetail__container">
            <section className="adoptionDetail__hero">

              {/* HERO LEFT */}
              <section className="adoptionDetail__hero-left">
                {/* slider */}


                <div className="slider">
                  <AwesomeSlider>
                    {data.photos.map((item, index)=>(
                      <div className='slider__photo' key={index}>
                        <img  src={item.large} alt=""/>
                      </div>
                    ))}
                  </AwesomeSlider>
                </div>
              </section>

              {/* HERO RIGHT */}
              <section className="adoptionDetail__hero-right">
                <div className="adoptionDetail__card adoptionDetail__card-greeting">
                  <h5 className="adoptionDetail__greeting">Hi! I'm</h5>
                  <h1 className="adoptionDetail__name">
                    <span className='hvr-bounce-to-right' >{data.name}</span> </h1>
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
                    <TagGroup >
                      {/* render TAG */}
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

      <section className="recommend">{renderRecommend}</section>
    </>
  );
}
