import React from 'react'
import './style.scss'
import {
    Link,
    useRouteMatch
  } from "react-router-dom";

function CustomeLink({ label, to, activeOnlyWhenExact, handleClick }) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });

  
    return (
      <div onClick={handleClick}>
        <Link to={to} style={{ textDecoration: 'none' }}><h1 className={match ? 'link link-active hvr-bounce-to-right': 'link hvr-bounce-to-right'}>{label}</h1></Link>
      </div>
    );
  }


export default function Menu({turnOff}) {
    return (
        <div className={`menu`}>
            <div className="menu__nav">
            <CustomeLink
          activeOnlyWhenExact={true}
          to="/"
          label="HOME"
          handleClick={turnOff}
        />
        <CustomeLink
          activeOnlyWhenExact={true}
          to="/adoption"
          label="ADOPTION"
          handleClick={turnOff}
        />
            <h1>WHY?</h1>
            <h1>OUR STORY</h1>
            <h1>SUPPORT</h1>
            </div>
            <div className="menu__footer">
                <img src={require('../../assets/SVG/black_cat.svg')} alt="this is a black cat" className="menu__cat"/>
                <div className="menu__share">
                <img src={require("../../assets/SVG/facebook.svg")} alt="The share button for facebook" className="menu__facebook"/>
                <img src={require("../../assets/SVG/twitter.svg")} alt="The share button for twitter" className="menu__instagram"/>
                <img src={require("../../assets/SVG/instagram.svg")} alt="The share button for instagram" className="menu__facebook"/>
                <img src={require("../../assets/SVG/behance.svg")} alt="The share button for behance" className="menu__behance"/>
                </div>
            </div>
        </div>
    )
}
