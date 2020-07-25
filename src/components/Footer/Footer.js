import React from 'react'
import './style.scss'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">
                <div className="footer__card footer__card-one">
                    <div className="footer__card-heading">
                    <img src="./assets/svg/Icon-phone.svg" alt="phone icon"/>
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
                    <img src="./assets/svg/Icon-email.svg" alt="mail icon"/>
                    <h2 className="footer__card-heading-txt">CONTACT</h2>
                    </div>
                    <div className="footer__card-body">
                    catrescue@cathome.com
                    </div>
                </div>
            </div>

            <div className="footer__icons">

                <img src="./assets/logo.svg" alt="blue logo of cat home" className='footer__logo'/>
            <div className="footer__share">
                <img src="./assets/svg/facebook.svg" alt="The share button for facebook" className="footer__facebook"/>
                <img src="./assets/svg/twitter.svg" alt="The share button for twitter" className="footer__instagram"/>
                <img src="./assets/svg/instagram.svg" alt="The share button for instagram" className="footer__facebook"/>
                <img src="./assets/svg/behance.svg" alt="The share button for behance" className="footer__behance"/>
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
