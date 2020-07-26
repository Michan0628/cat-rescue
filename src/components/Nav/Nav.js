import React from 'react'
import './style.scss'
import Burger from '../Burger/Burger'
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
          <Burger />
        </section>
      </nav>
    )
}
