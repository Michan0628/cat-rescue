import React from 'react'

export default function Nav() {
    return (
        <nav className="navBar">
        <section className="navBar__logo">
          <img
            src="./assets/logo.svg"
            alt="This is blue logo of cat home"
            className="navBar__logoImage"
          />
        </section>
        <section className="navBar__hamburger">
          <img
            src="./assets/hamburger.svg"
            alt="This is icon of hamburger menu"
            className="hamburger"
          />
        </section>
      </nav>
    )
}
