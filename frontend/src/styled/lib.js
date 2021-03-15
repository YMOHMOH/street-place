import styled, { keyframes } from "styled-components";

/* --------------- FOOTER ---------------- */

export const FooterWrapper = styled.footer`
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  position: relative;
  width: 100%;
  height: auto;
  padding: 3.1rem 6.25rem;
  background: #333;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media (max-width: 991px) {
    padding: 40px;
  }

  p {
    color: #999;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    flex-direction: column;
  }

  h2 {
    position: relative;
    color: #fff;
    font-weight: 500;
    margin-bottom: 15px;

    &:before {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background: #f00;
    }
  }
`;

export const AboutUs = styled.div`
  margin-right: 1.9rem;
  width: 40%;

  @media (max-width: 991px) {
    margin-right: 0rem;
    margin-bottom: 2.5rem;
    width: 100%;
  }
`;

export const SciFooter = styled.ul`
  margin-top: 20px;
  display: flex;

  li {
    list-style: none;
    width: 40px;
    height: 40px;
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;

    &:hover {
      background: #f00;
    }
  }
`;

export const QuickLinks = styled.div`
  position: relative;
  width: 25%;
  margin-right: 1.9rem;

  @media (max-width: 991px) {
    margin-right: 0rem;
    margin-bottom: 2.5rem;
    width: 100%;
  }
  ul {
    li {
      color: #999;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const ContactFooter = styled.div`
  margin-right: 1.9rem;
  width: calc(35% - 3.8rem);
  margin-right: 0 !important;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const InfoFooter = styled.ul`
  position: relative;
  li {
    display: flex;
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
    p {
      color: #999;
      &:hover {
        color: #fff;
      }
    }
    span {
      color: #999;
      &:hover {
        color: #fff;
      }
      &:nth-child(1) {
        color: #fff;
        font-size: 1.25rem;
        margin-right: 10px;
      }
    }
  }
`;

export const CopyrightText = styled.div`
  width: 100%;
  background: #181818;
  /* padding: 8px 6.25rem; */
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: #999;
  /* @media (max-width: 991px) {
    padding: 8px 2.5rem;
  } */
  @media (max-width: 991px) {
    padding: 0rem;
  }
`;

/* --------------- END OF FOOTER ---------------- */

/* --------------- INFOBAR ---------------- */
export const InfoBarWrapper = styled.div`
  background: #333;
  /* height: 75vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;

export const InfoBarContainer = styled.div`
  width: 700px;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 991px) {
    width: 440px;
    justify-content: space-around;
  }
`;

export const InfoBarContent = styled.div`
  p {
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 50px;
  }

  h3 {
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

export const InfoBarFace = styled.div`
  width: 150px;
  height: 100px;
  transition: 0.5s;
  &:nth-child(1) {
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(50px);

    ${InfoBarContent} {
      opacity: 0.2;
      transition: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
  &:nth-child(2) {
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
    transform: translateY(-50px);
    /* @media (max-width: 991px) {
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
    } */
  }
`;

export const InfoBarCard = styled.div`
  position: relative;
  &:hover {
    ${InfoBarFace} {
      &:nth-child(1) {
        transform: translateY(0);
        background: #f00;
        ${InfoBarContent} {
          opacity: 1;
        }
      }
      &:nth-child(2) {
        transform: translateY(0);
      }
    }
  }

  /* @media (max-width: 991px) {
    margin-right: 50px;
  } */
`;

/* --------------- END OF INFOBAR ---------------- */
