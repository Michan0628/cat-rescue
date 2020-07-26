import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { useParams } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";

const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIweGpDSkR6M3VIWWRIeWZFbU1uVExiMkhUd1dnSHNjTkxnclhYMGp0NkloUkNSek1obyIsImp0aSI6IjkzMmI1YjczZTQ2MTdlYmFlZTU1ZjYwMmVmNWYyN2I2OGM2NWZlMWU1M2FiMmNhYTYxOTgyMTc0YmU4MTZkZGExMTI4NzM4NWM0NjM4NWM2IiwiaWF0IjoxNTk1NzM0MzQ1LCJuYmYiOjE1OTU3MzQzNDUsImV4cCI6MTU5NTczNzk0NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.R1ezWmo3FDF-KifgANocErqZwLURp37rMyRIgzKq4KO2ofgdUUaLZDV_w16MHEMNvI3-yCC1luuyrW-fHwhl1N2GOXUwkT3EBHigjTJdYR4w194GvNXVBKRCkw32CtKYSy8uuj-4v-rwH76e4zHyj3-gI78hW4PAYC4js-uZrTKrfjmPwsq5exAk-4rCYqQelDS0WObiEwiso4fNnztdYArkEEnaoln9w4GQaHwlROXqQdpoqsyEfHGXiALlJkDA6mtprBSxO4fm51hXNR9Ai8uFcchKqub0ZDT1seo-hNx0VatmOJIGAnak5AhW0FIZCrDJ4eB4R_usyR3_VuKvtQ";

export default function AdoptionDetail() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [shelterId, setShelterId] = useState()
  const [shelterContact, setShelterContact]=useState()
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
        console.log('name is', res.data.animal.name, 'color:',res.data.animal.colors, 'age is',res.data.animal.age)

        setData(res.data.animal);
        setShelterId(res.data.animal.organization_id)
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          const errorStatus = error.response.status;
          if (errorStatus === 400) {
            setErrorMessage(
              `Could not determine location. Please use format 'city, state' or postal code`
            );
            setIsLoading(true)
          } else {
            setErrorMessage("Token expired");
          }
          setData([data]);
        }
      });
      if(shelterId){
          axios.get(`https://api.petfinder.com/v2/organizations/${shelterId}`, config)
          .then((res)=>{
              console.log(res.data.organization)
              setShelterContact(res.data.organization)
          })
      }
    }, [shelterId]);
    const color = data ? data.colors.primary : '';
    const breed = data ? data.breeds.primary : '';
 
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
                <h1 className="adoptionDetail__name">
                {data.name}
            </h1>
                <section className="adoptionDetail__info">
                  <div>{color}- {data.gender} - {data.age} - {data.status}</div>
  <div>{breed} - {data.contact.address.city} {data.contact.address.state}</div>
                </section>
                <section className="adoptionDetail__tags">
                  <TagGroup style={{ marginRight: "1rem" }}>
                     
                   
                    {/* render tag */}
                    {data.tags === null ? (
                        <div></div>
            ) : (
              
                data.tags.map((item,index) => (
                <div key={index}>
                <Tag style={{ backgroundColor: "#D775A3", color: "white" }}>
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
              <h1 className="adoptionDetail__shelter-heading">
                Shelter / Rescue Group
              </h1>
              <h5 className="adoptionDetail__shelter-name">
                Safehome animal rescue
              </h5>

              <section className="adoptionDetail__shelter-contact">
                <img
                  src="./assets/svg/location.svg"
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__location">Toronto, ON</div>
              </section>
              <section className="adoptionDetail__shelter-contact">
                <img
                  src="./assets/svg/Icon-email.svg"
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__email">rescue@gmail.com</div>
              </section>
              <section className="adoptionDetail__shelter-contact">
                <img
                  src="./assets/svg/Icon-phone.svg"
                  alt=""
                  className="adoptionDetail__shelter-icon"
                />
                <div className="adoptionDetail__phone">123-456-789</div>
              </section>
            </section>
            <section className="adoptionDetail__story adoptionDetail__card">
              <h1 className="adoptionDetail__story-heading">My Story</h1>
              <div className="adoptionDetail__story-body">{data.description}</div>
            </section>
          </section>
        </div>
      )}
    </section>
  );
}
