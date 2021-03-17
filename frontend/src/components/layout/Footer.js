// import React, { Fragment } from "react";
// /* import "./style.css"; */

// function Footer() {
//   return (
//     <Fragment>
//       <footer className="py-1">
//         {/* text-white */}
//         <p className="text-center  mt-1">
//           Shopping Cart - 2019-2020, All Rights Reserved
//         </p>
//       </footer>
//     </Fragment>
//   );
// }

// export default Footer;
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FooterWrapper,
  FooterContainer,
  AboutUs,
  SciFooter,
  QuickLinks,
  ContactFooter,
  InfoFooter,
  CopyrightText,
  InfoBarContainer,
  InfoBarCard,
  InfoBarFace,
  InfoBarContent,
  InfoBarWrapper,
} from "../../styled/lib";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  let history = useHistory();

  return (
    <>
      <InfoBarWrapper>
        <InfoBarContainer>
          <InfoBarCard>
            <InfoBarFace>
              <InfoBarContent>
                <img src="/images/delivery.png" />
                <h3>Livraison gratuite</h3>
              </InfoBarContent>
            </InfoBarFace>
            <InfoBarFace>
              <InfoBarContent>
                <p>En France Métropolitaine à partir de 20 euros</p>
              </InfoBarContent>
            </InfoBarFace>
          </InfoBarCard>
          <InfoBarCard>
            <InfoBarFace>
              <InfoBarContent>
                <img src="/images/exchange.png" />
                <h3>Satisfait ou remboursé</h3>
              </InfoBarContent>
            </InfoBarFace>
            <InfoBarFace>
              <InfoBarContent>
                <p>
                  14 jours pour retourner un article. Remboursement effectué dés
                  réception
                </p>
              </InfoBarContent>
            </InfoBarFace>
          </InfoBarCard>
          <InfoBarCard>
            <InfoBarFace>
              <InfoBarContent>
                <img src="/images/credit-card.png" />
                <h3>Paiements securisées</h3>
              </InfoBarContent>
            </InfoBarFace>
            <InfoBarFace>
              <InfoBarContent>
                <p>Tous les paiements sont sécurisés et approuvés</p>
              </InfoBarContent>
            </InfoBarFace>
          </InfoBarCard>
          <InfoBarCard>
            <InfoBarFace>
              <InfoBarContent>
                <img src="/images/clock.png" />
                <h3>Expedition rapide</h3>
              </InfoBarContent>
            </InfoBarFace>
            <InfoBarFace>
              <InfoBarContent>
                <p>Les commandes sont traitées sous 24h</p>
              </InfoBarContent>
            </InfoBarFace>
          </InfoBarCard>
        </InfoBarContainer>
      </InfoBarWrapper>
      <FooterWrapper>
        <FooterContainer>
          <AboutUs>
            <h2>StreetPlace</h2>
            <p>
              La culture urbaine s'exprime. StreetPlace a été créé afin de
              répondre aux besoins de jeunes créateurs et ainsi mettre en avant
              leur créativité artisitique.
            </p>
            <div
              style={{
                displex: "flex",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <img
                src="/images/cb.jpg"
                alt="payment"
                width="65px"
                height="50px"
              />
              <img
                src="/images/visa.jpg"
                alt="payment"
                width="65px"
                height="50px"
              />
              <img
                src="/images/mastercard.jpg"
                alt="payment"
                width="65px"
                height="50px"
              />
              <img
                src="/images/paypal.png"
                alt="payment"
                width="65px"
                height="50px"
              />
              {/* <li>
                <i class="fa fa-instagram"></i>
              </li>
              <li>
                <i class="fa fa-snapchat"></i>
              </li>
              <li>
                <i class="fa fa-facebook"></i>
              </li>*/}
            </div>
          </AboutUs>
          <QuickLinks>
            <h2>Informations</h2>
            <ul>
              <Link to="/shipping/info/" style={{ textDecoration: "none" }}>
                <li>Livraison et Retour</li>
              </Link>

              <Link to="/payment/info" style={{ textDecoration: "none" }}>
                <li>Paiement sécurisé</li>
              </Link>
              <Link to="/legalNotice/info" style={{ textDecoration: "none" }}>
                <li>Mentions légales</li>
              </Link>
              <Link to="/cgv/info" style={{ textDecoration: "none" }}>
                <li>CGV</li>
              </Link>
            </ul>
          </QuickLinks>
          <ContactFooter>
            <h2>Service Client</h2>
            <InfoFooter>
              <li>
                <span>
                  <FontAwesomeIcon icon="map-marker" />
                </span>
                <span>
                  13 Rue Robert Schumann
                  <br />
                  95600 Eaubonne
                </span>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon="phone" />
                </span>
                <p>+336.67.49.86.94</p>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon="envelope" />
                </span>
                <p>sav@streetplace.fr</p>
              </li>
            </InfoFooter>
          </ContactFooter>
        </FooterContainer>
      </FooterWrapper>
      <CopyrightText>
        <p>Copyright © 2021 - StreetPlace</p>
      </CopyrightText>
    </>
  );
}

export default Footer;
