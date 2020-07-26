import React from 'react'
import './style.scss'

export default function Menu(prop) {
    return (
        <div className={`menu ${prop.class}`}>
            <div className="menu__nav">
            <h1>HOME</h1>
            <h1>ADOPTION</h1>
            <h1>WHY?</h1>
            <h1>OUR STORY</h1>
            <h1>SUPPORT</h1>
            </div>
            <div className="menu__footer">
                <img src="./assets/svg/black_cat.svg" alt="this is a black cat" className="menu__cat"/>
                <div className="menu__share">
                <img src="./assets/svg/facebook.svg" alt="The share button for facebook" className="menu__facebook"/>
                <img src="./assets/svg/twitter.svg" alt="The share button for twitter" className="menu__instagram"/>
                <img src="./assets/svg/instagram.svg" alt="The share button for instagram" className="menu__facebook"/>
                <img src="./assets/svg/behance.svg" alt="The share button for behance" className="menu__behance"/>
                </div>
            </div>
        </div>
    )
}
