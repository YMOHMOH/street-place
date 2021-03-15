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
                <p>Lorem ipsum dolor sit amet</p>
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
                <p>Lorem ipsum dolor sit amet</p>
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
                <p>Lorem ipsum dolor sit amet</p>
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
                <p>Lorem ipsum dolor sit amet</p>
              </InfoBarContent>
            </InfoBarFace>
          </InfoBarCard>
        </InfoBarContainer>
      </InfoBarWrapper>
      <FooterWrapper>
        <FooterContainer>
          <AboutUs>
            <h2>Sons Of Streetwear</h2>
            <p>
              La marque sons of street a été créée en 2013. Inspirée par la
              série sons of anarchy, elle est la rencontre entre le monde des
              bikers et le streetwear urbain d'aujourd'hui.
            </p>
            {/* <SciFooter>
              <li>
                <i class="fa fa-instagram"></i>
              </li>
              <li>
                <i class="fa fa-snapchat"></i>
              </li>
              <li>
                <i class="fa fa-facebook"></i>
              </li>
            </SciFooter> */}
          </AboutUs>
          <QuickLinks>
            <h2>Informations</h2>
            <ul>
              <li>Livraison et Retour</li>
              <li>Paiement sécurisé</li>
              <li>Mentions légales</li>
              <li>CGV</li>
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
                <p>sonsofstreetwear@gmail.com</p>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon="envelope" />
                </span>
                <p>Contact en ligne</p>
              </li>
            </InfoFooter>
          </ContactFooter>
        </FooterContainer>
      </FooterWrapper>
      <CopyrightText>
        <p>Copyright © 2013 - 2021 Sons Of Streetwear</p>
      </CopyrightText>
    </>
  );
}

export default Footer;
