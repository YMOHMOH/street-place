import React from "react";
import { Helmet } from "react-helmet";
/* import "./style.css"; */

function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - StreetPlace`}</title>
    </Helmet>
  );
}

export default MetaData;
