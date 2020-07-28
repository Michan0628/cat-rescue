import React from 'react'
import './style.scss'
import Bounce from 'react-reveal/Bounce';

export default function Footer() {
    return (
        <div className='footer'>
<Bounce right cascade duration={1500}>
            <div className="footer__container">
                <div className="footer__card footer__card-one">
                    <div className="footer__card-heading">
                    <img src={require("../../assets/SVG/Icon-phone.svg")} alt="phone icon"/>
                    <h3 className="footer__card-heading-txt">1-647-978-0544</h3>
                    </div>
                    <div className="footer__card-body footer__card-workTime">
                    <div className="footer__card-week">
                    Mon ~ Fri
                    </div> 
                    <div className="footer__card-time">
                    9:00 ~ 18:00
                    </div>
                    </div>
                </div>
                <div className="footer__card footer__card-two">
                    <div className="footer__card-heading">
                    <img src={require("../../assets/SVG/Icon-email.svg")} alt="mail icon"/>
                    <h2 className="footer__card-heading-txt">CONTACT</h2>
                    </div>
                    <div className="footer__card-body">
                    catrescue@cathome.com
                    </div>
                </div>
            </div>
            </Bounce>

            <div className="footer__icons">

                <img src={require("../../assets/SVG/logo.svg")} alt="blue logo of cat home" className='footer__logo'/>
            <div className="footer__share">

                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-url="https://dora-he-cat-rescue.com" data-lang="en" data-show-count="false">
                <img src={require("../../assets/SVG/twitter.svg")} alt="The share button for twitter" className="footer__twitter"/>
                </a>

                <a href="https://www.facebook.com/sharer/sharer.php?u=http://dora-he-cat-rescue.com" target="_blank" rel="noopener noreferrer" >
                <img src={require("../../assets/SVG/facebook.svg")} alt="The share button for facebook" className="footer__facebook"/>
                </a>

                <a href='https://instagram.com/petfinder?igshid=z4t7q86mfrix'>
                <img src={require("../../assets/SVG/instagram.svg")} alt="The share button for instagram" className="footer__instagram"/>
                </a>
                
                <a href='https://www.behance.net/duojiaohe'>
                <img src={require("../../assets/SVG/behance.svg")} alt="The share button for behance" className="footer__behance"/>
                </a>
            </div>
            </div>
            {/* <div className="footer__nav-wrapper">
            <div className="footer__nav">
                <div>HOME</div>
                <div className='footer__nav-end'>SUPPORT</div>
                <div>ADOPTION</div>
                <div className='footer__nav-end'>STORY</div>
            </div>

            </div> */}

        </div>
    )
}
