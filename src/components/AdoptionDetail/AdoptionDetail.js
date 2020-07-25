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
            <div className="adoptionDetail__card adoptionDetail__card-greeting">
                
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
                <TagGroup style={{marginRight:'1rem'}}>
                    <Tag style={{backgroundColor:'#D775A3', color:'white'}}>Cute</Tag>
                    <Tag style={{backgroundColor:'#D775A3', color:'white'}}>Black</Tag>
                    <Tag style={{backgroundColor:'#D775A3', color:'white'}}>Black</Tag>
                    <Tag style={{backgroundColor:'#D775A3', color:'white'}}>Black</Tag>

                </TagGroup>
            </section>
            </div>
        </section>
      </section>

<section className="adoptionDetail__body">
    <section className="adoptionDetail__shelter adoptionDetail__card">
        <h1 className="adoptionDetail__shelter-heading">Shelter / Rescue Group</h1>
        <h5 className="adoptionDetail__shelter-name">
            Safehome animal rescue
        </h5>

        <section className="adoptionDetail__shelter-contact">
            <img src="./assets/svg/location.svg" alt="" className="adoptionDetail__shelter-icon"/>
            <div className="adoptionDetail__location">Toronto, ON</div>
        </section>
        <section className="adoptionDetail__shelter-contact">
            <img src="./assets/svg/Icon-email.svg" alt="" className="adoptionDetail__shelter-icon"/>
            <div className="adoptionDetail__email">rescue@gmail.com</div>
        </section>
        <section className="adoptionDetail__shelter-contact">
            <img src="./assets/svg/Icon-phone.svg" alt="" className="adoptionDetail__shelter-icon"/>
            <div className="adoptionDetail__phone">123-456-789</div>
        </section>
    </section>
    <section className="adoptionDetail__story adoptionDetail__card">
        <h1 className='adoptionDetail__story-heading'>My Story</h1>
        <div className="adoptionDetail__story-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi aliquid, maxime quibusdam asperiores facilis id delectus suscipit dignissimos explicabo sequi excepturi deleniti dolores odit sed labore saepe fugit? Numquam, explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio nesciunt culpa dolorem reiciendis inventore cumque repellendus eaque, deleniti, aut recusandae obcaecati itaque impedit fugiat necessitatibus fuga exercitationem, dolores modi nisi?
        Corporis iure eligendi sequi necessitatibus. Cum quo, reiciendis odio quam accusamus optio fugiat commodi. Totam, voluptatibus? Dignissimos libero illo, iusto architecto maiores facere voluptates cumque beatae ducimus velit atque fugiat!
        Nemo facere quidem consectetur recusandae? Voluptates saepe voluptas cum sapiente. Iste assumenda odit officia numquam et, consectetur officiis. Neque distinctio nihil et iste quisquam error facere hic eligendi. Iste, necessitatibus.</div>
    </section>
</section>
    </section>
  );
}
