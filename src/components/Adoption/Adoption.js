import React from "react";
import Card from '../Card/Card'
import './style.scss';

export default function Adoption() {
  return (
    <div className="adoptionSearch">
      <section className="adoptionSearch__heading">
        <h1 className="adoptionSearch__heading-main">
          Find your best friend here
        </h1>
        <h2 className="adoptionSearch__heading-second">
          Change their and your lives
        </h2>
      </section>
      {/* Search Form */}
      <section className="adoptionSearch__form"></section>
      {/* Search Result */}
      <section className="adoptionSearch__list">
        <Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card />
       <Card />

       

      </section>
        <div className="pagination">
          <button className="previous">Previous Page</button>
          <button className="next">Next Page</button>
        </div>
    </div>
  );
}
