import React, { useState, useEffect } from "react";
import { Icon, Tag, TagGroup } from "rsuite";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import Card from "../Card/Card";
// photo carousel
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/src/core/styles.scss";
import Bounce from "react-reveal/Bounce";
import Fade from 'react-reveal/Fade';

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJGaHluMzBBMkk0d1h0aWtvZWdtOThlbzVaUEpKZFBpMUVmMXppV01sc3VrUjMwMlJVTSIsImp0aSI6IjU3MjczYWI3YjIwNmJiZGY1NWQwZGQ4NmU2MGU2ZGVlYjgxNjljMzNkZDdjYWQ5NzRhNjYwODhhY2U5MTJiNGVkNmM3MWM5YjA5ZDM1M2EzIiwiaWF0IjoxNTk1OTEwNDc5LCJuYmYiOjE1OTU5MTA0NzksImV4cCI6MTU5NTkxNDA3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.g0gy893aPfFj-fZkW_YD3Ois2WjC-UnNfg_G0OXQ1-tkIWDpRBu1cXhicSrUcUr_R8dtjYd7pWJ4i8cTR8w2ye60CdJ-G7Yi5ygyssm1-IOK1dyjbMeHjpB92OgNq_Dh3dfCVIzfumiBhlhuoFeDMij4nu86UGyUvsHXoTC1SYqVRkWEd5Mb58z6tvtswNENn9MNwaPUbPDPwNAUddN1WrI24AvWwT_0EtQD9iLpmM81hsQuEdZwkO_0GwOeqrBfAmryL2mvhyopBzFX4uT7gtL16aBMSzRvMbCZEcoRd-Bp5FrHWTSUucGPbXKolikx-OZa9iYi9INmZrBVZfpaC";

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
          console.log(errorMessage);
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
    <Fade duration={1500}>
    <>
      <h1 className="adoptionDetail__shelter-heading">
        Shelter / Rescue Group
      </h1>
      <h5 className="adoptionDetail__shelter-name">
        <span className="hvr-bounce-to-right">{shelterContact.name}</span>
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
    </Fade>
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

        <Bounce right cascade>
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
        </Bounce>
      </>
    ) : (
      <h5 className="recommend__loading loading__recommend">
        <Icon icon="spinner" spin /> Loading...
      </h5>
    );
  return (
    <>
      <section className="adoptionDetail">
        {/* render cat */}

        {isLoading ? (
          <div className="loading__profile">
            <h1>
              <Icon icon="spinner" spin />
              Loading...
            </h1>
          </div>
        ) : (
          <div className="adoptionDetail__container">
            <section className="adoptionDetail__hero">
              {/* HERO LEFT */}
              <section className="adoptionDetail__hero-left">


                {/* slider */}
              <Fade duration={1500}>
                <div className="slider">
                  <AwesomeSlider>
                    {data.photos.map((item, index) => (
                      <div className="slider__photo" key={index}>
                        <img src={item.large} alt="" />
                      </div>
                    ))}
                  </AwesomeSlider>
                </div>
                </Fade>
              </section>

              {/* HERO RIGHT */}
              <section className="adoptionDetail__hero-right">
                <div className="adoptionDetail__card adoptionDetail__card-greeting">
                  <h5 className="adoptionDetail__greeting">Hi! I'm</h5>
                  <Bounce right>
                  <h1 className="adoptionDetail__name">
                    <span className="hvr-bounce-to-right">{data.name}</span>{" "}
                  </h1>
                  </Bounce>

                  <Bounce right cascade>
                    <section className="adoptionDetail__info">
                      <div>
                        {color}- {data.gender} - {data.age} - {data.status}
                      </div>
                      <div>
                        {breed} - {data.contact.address.city}{" "}
                        {data.contact.address.state}
                      </div>
                    </section>
                  </Bounce>

                  <section className="adoptionDetail__tags">
                    <TagGroup>
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

              <Fade duration={1500}>
              <section className="adoptionDetail__story adoptionDetail__card">
                <h1 className="adoptionDetail__story-heading">My Story</h1>
                <div className="adoptionDetail__story-body">
                  {data.description}
                </div>
              </section>
              </Fade>

            </section>
          </div>
        )}
      </section>

      <section className="recommend">{renderRecommend}</section>
    </>
  );
}
