import React from 'react'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">
                <div className="footer__card footer__card-one">
                    <div className="footer__card-heading">
                    <img src="./assets/svg/Icon-phone.svg" alt="phone icon"/>
                    <div className="footer__card-heading-txt">1-647-978-0544</div>
                    </div>
                    <div className="footer__card-body">
                    Mon ~ Fri  9:00 ~ 18:00
                    </div>
                </div>
                <div className="footer__card footer__card-two">
                    <div className="footer__card-heading">
                    <img src="./assets/svg/Icon-email.svg" alt="mail icon"/>
                    <div className="footer__card-heading-txt">1-647-978-0544</div>
                    </div>
                    <div className="footer__card-body">
                    Mon ~ Fri  9:00 ~ 18:00
                    </div>
                </div>
            </div>

            <div className="footer__icons">
            <div className="footer__logo">
                <img src="./assets/svg/logo.svg" alt="blue logo of cat home"/>
            </div>
            <div className="footer__share">
                <img src="./assets/svg/facebook.svg" alt="The share button for facebook" className="footer__facebook"/>
                <img src="./assets/svg/twitter.svg" alt="The share button for twitter" className="footer__twitter"/>
            </div>
            </div>

            <div className="footer__nav">
                <div>HOME</div>
                <div>SUPPORT</div>
                <div>ADOPTION</div>
                <div>STORY</div>
            </div>

        </div>
    )
}
