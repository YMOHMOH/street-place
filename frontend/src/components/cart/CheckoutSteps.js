import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {shipping ? (
        <Link to="/shipping" className="float-right">
          {/* <div className="triangle2-active"></div> */}
          <div className="step active-step">Livraison</div>
          {/* <div className="triangle-active"></div> */}
        </Link>
      ) : (
        <Link to="#!" disabled>
          {/* <div className="triangle2-incomplete"></div> */}
          <div className="step incomplete">Livraison</div>
          {/* <div className="triangle-incomplete"></div> */}
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm" className="float-right">
          {/* <div className="triangle2-active"></div> */}
          <div className="step active-step">Confirmer</div>
          {/* <div className="triangle-active"></div> */}
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirmer</div>
          {/* <div className="triangle-incomplete"></div> */}
        </Link>
      )}

      {payment ? (
        <Link to="/payment" className="float-right">
          {/* <div className="triangle2-active"></div> */}
          <div className="step active-step">Paiement</div>
          {/* <div className="triangle-active"></div> */}
        </Link>
      ) : (
        <Link to="#!" disabled>
          {/* <div className="triangle2-incomplete"></div> */}
          <div className="step incomplete">Paiement</div>
          {/* <div className="triangle-incomplete"></div> */}
        </Link>
      )}
    </div>
  );
}

export default CheckoutSteps;
