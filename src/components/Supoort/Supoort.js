import React from "react";
import "./style.scss";
import Fade from "react-reveal/Fade";

export default function Supoort() {
  return (
    <div className="volunteer">
      <Fade bottom cascade duration={2000}>
        <div className="volunteer__hero">
          <h1 className="volunteer__heading">Volunteer with us</h1>
          <h5 className="volunteer__subheading">
            Important question to ask yoursel before you decide to be a foster
            family
          </h5>
        <img
          className="volunteer__img"
          src={require("../../assets/photo/volunteer-hero.png")}
          alt="yello cat under the tree"
        />
        </div>
      </Fade>


      <Fade right cascade duration={2000} delay={1000}>
        <div className="volunteer__body">
          <div className="volunteer__card questionCard">
            <div className="questionCard__number">Q1</div>

            <Fade right cascade duration={2000} delay={500}>
              <div className="questionCard__body">
                <div className="questionCard__question">
                  Will you be able to spend quality time with the animals?
                </div>
                <div className="questionCard__answer">
                  On average, it is best to spend at least 2 hours a day with
                  your foster animals. Socialization can be as important as
                  feeding them and keeping them clean.
                </div>
              </div>
            </Fade>
          </div>

          <div className="volunteer__card questionCard">
            <div className="questionCard__number">Q2</div>

            <Fade right cascade duration={2000} delay={500}>
              <div className="questionCard__body">
                <div className="questionCard__question">
                  Can you commit to bringing them to veterinary appointments as
                  required?
                </div>
                <div className="questionCard__answer">
                  We ask that you provide your own transportation to these
                  appointments. You will also be required to possess a cat
                  carrier before receiving your first foster cat.
                </div>
              </div>
            </Fade>
          </div>

          <div className="volunteer__card questionCard">
            <div className="questionCard__number">Q3</div>

            <Fade right cascade duration={2000} delay={500}>
              <div className="questionCard__body">
                <div className="questionCard__question">
                  Are you aware that most of the cats in our foster program have
                  varying degrees of health or behavioural concerns?
                </div>
                <div className="questionCard__answer">
                  We primarily rescue cats that are not suited for adoption from
                  shelters because they are ill, injured, scared and shy. The
                  cats we rescue are the ones at greatest risk for euthanasia.
                </div>
              </div>
            </Fade>
          </div>

          <div className="volunteer__card questionCard">
            <div className="questionCard__number">Q4</div>

            <Fade right cascade duration={2000} delay={500}>
              <div className="questionCard__body">
                <div className="questionCard__question">
                  Do you feel comfortable explaining to friends that these cats
                  are not yours to adopt out and that they must go through the
                  regular adoption process at TCR?
                </div>
                <div className="questionCard__answer">
                  All potential adopters are required to speak with one of our
                  adoption counselors before they are permitted to take a cat
                  home.
                </div>
              </div>
            </Fade>
          </div>

          <div className="volunteer__card questionCard">
            <div className="questionCard__number">Q5</div>

            <Fade right cascade duration={2000} delay={500}>
              <div className="questionCard__body">
                <div className="questionCard__question">
                  Are you emotionally prepared to handle the death of one of
                  your foster animals?
                </div>
                <div className="questionCard__answer">
                  This can be very difficult, but the sad truth is that it
                  sometimes happens, especially with kittens.
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </Fade>

      <h1 className="volunteer__footer">
        We always need Foster Homes for cats or kittens! If you are interested
        in literally saving and making lives better become a foster parent,
        please
        <span className='volunteer__footer-highlight'> contact us</span>
      </h1>
    </div>
  );
}
