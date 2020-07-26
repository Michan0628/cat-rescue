import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './style.scss'
import { Fade as Hamburger } from "hamburger-react";


export default function NavMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='navMenu'>
        <img src={require("../../assets/SVG/logo.svg")} alt="the blue logo of cat home" className="navMenu__logo"/>
        <div className="burgerIcon">

      <Hamburger toggled={isOpen} toggle={setOpen} color="#58B5C9" rounded className='burgerIcon'/>
        </div>
        <div className={`menu__wrapper ${isOpen? ('menu__wrapper-open'):''}`}>
         <Menu class={isOpen ? (''):('')}/>
        </div>

    </div>
  );
}
