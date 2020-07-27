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

                {/* share icon */}
                <div className="menu__share">

                
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url="https://dora-he-cat-rescue.com" data-lang="en" data-show-count="false" >
                <img src={require("../../assets/SVG/twitter.svg")} alt="The share button for twitter" className="menu__twitter"/>
                </a>

                <a href="https://www.facebook.com/sharer/sharer.php?u=http://dora-he-cat-rescue.com" target="_blank" rel="noopener noreferrer">
                <img src={require("../../assets/SVG/facebook.svg")} alt="The share button for facebook" className="menu__facebook"/>
                </a>

                <a href='https://instagram.com/petfinder?igshid=z4t7q86mfrix'>
                <img src={require("../../assets/SVG/instagram.svg")} alt="The share button for instagram" className="menu__instagram"/>
                </a>
                
                <a href='https://www.behance.net/duojiaohe'>
                <img src={require("../../assets/SVG/behance.svg")} alt="The share button for behance" className="menu__behance"/>
                </a>

                
                </div>
            </div>
        </div>
    )
}
