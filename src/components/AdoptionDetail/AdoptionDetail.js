import React from "react";
import "./style.scss";
import Nav from "../Nav/Nav";
import { Carousel } from 'rsuite';
import { Tag, TagGroup } from 'rsuite';  
import Footer from '../Footer/Footer'  

export default function AdoptionDetail() {
  return (
    <section className="adoptionDetail">
      <section className="adoptionDetail__hero">
        <section className="adoptionDetail__hero-left">
            <div className="slider">

            </div>
          
        </section>
        <section className="adoptionDetail__hero-right">
            <h5 className="adoptionDetail__greeting">
                Hi! I'm
            </h5>
            <h1 className="adoptionDetail__name">
                Shadow
            </h1>
            <section className="adoptionDetail__info">
            <div>Black - Mail - Adult - Large</div>
            <div>Domestic Short Hair - Toronto, ON</div>
            </section>
            <section className="adoptionDetail__tags">
                <TagGroup>
                    <Tag style={{backgroundColor:'#D775A3', color:'white'}}>Cute</Tag>
                    <Tag>Black</Tag>
                </TagGroup>
            </section>
        </section>
      </section>

<section className="adoptionDetail__body">
    <section className="adoptionDetail__shelter">
        <h1 className="adoptionDetail__shelterHeading">Shelter / Rescue Group</h1>
        <h5 className="adoptionDetail__shelterName">
            Safehome animal rescue
        </h5>

        <section className="adoptionDetail__shelter-contact">
            <img src="" alt="" className="adoptionDetail__icon"/>
            <div className="adoptionDetail__location">Toronto, ON</div>
        </section>
        <section className="adoptionDetail__shelter-contact">
            <img src="" alt="" className="adoptionDetail__icon"/>
            <div className="adoptionDetail__email">Toronto, ON</div>
        </section>
        <section className="adoptionDetail__shelter-contact">
            <img src="" alt="" className="adoptionDetail__icon"/>
            <div className="adoptionDetail__phone">Toronto, ON</div>
        </section>
    </section>
    <section className="adoptionDetail__story">
        <h1 className='adoptionDetail__story-heading'>My Story</h1>
        <div className="adoptionDetail__story-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aliquid, maxime quibusdam asperiores facilis id delectus suscipit dignissimos explicabo sequi excepturi deleniti dolores odit sed labore saepe fugit? Numquam, explicabo.</div>
    </section>
</section>
    </section>
  );
}
