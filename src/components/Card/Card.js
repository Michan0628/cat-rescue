import React from 'react'
import './style.scss'

export default function Card() {
    return (
        <>
        <section className="adoptionSearch__card card">
            <img src="./assets/photo/nathan-riley-_ir1D49PRqM-unsplash.jpg" alt="blackCat" className="card__photo" />
          <section className="card__body">
            <h5 className="card__name">Shadow</h5>
            <div className="card__breed">Domestic Shorthair</div>
            <div className="card__location">Markham, ON</div>
            <div className="card__learnMore">
              <div>Learn More</div>
              <img src="./assets/arrow.svg" alt="blue arrow" className="card__learnMoreIcon" />
            </div>
          </section>
        </section>


        {/* second */}
        {/* <section className="adoptionSearch__card card">

        <img src="./assets/photo/anton-lochov-_b020HIGZUE-unsplash.jpg" alt="blackCat" className="card__photo" />

      <section className="card__body">
        <h5 className="card__name">Shadow</h5>
        <div className="card__breed">Domestic Shorthair</div>
        <div className="card__location">Markham, ON</div>
        <div className="card__learnMore">
          <div>Learn More</div>
          <img src="./assets/arrow.svg" alt="blue arrow" className="card__learnMoreIcon" />
        </div>
      </section>
    </section> */}
    </>
    )
}
