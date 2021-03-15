import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

function ConfirmOrder({ history }) {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const totalHandler = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    return totalPrice.toFixed(2);
  };

  // Calculate Order Prices

  const itemsPrice = totalHandler();
  //   const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const shippingPrice = 0;
  //   const taxPrice = Number((0.2 * itemsPrice).toFixed(2));
  const taxPrice = 0;

  const total = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const proceedToPayment = () => {
    const data = { itemsPrice, shippingPrice, taxPrice, total };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirmer la commande"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Livraison</h4>
          <p>
            <b>Identifiant :</b> {user && user.name}
          </p>
          <p>
            <b>Téléphone :</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Adresse :</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.postalCode} ${shippingInfo.city}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Votre Panier :</h4>
          {cartItems.map((item) => {
            return (
              <Fragment>
                <hr />
                <div className="cart-item my-1" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <p id="card_item_size">
                        {item.size === "US" ? "Taille unique" : item.size}
                      </p>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x {item.price} € ={" "}
                        <b>{(item.quantity * item.price).toFixed(2)} €</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            );
          })}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Commande</h4>
            <hr />
            <p>
              Sous-Total :{" "}
              <span className="order-summary-values">{itemsPrice} €</span>
            </p>
            <p>
              Livraison :{" "}
              <span className="order-summary-values">{shippingPrice} €</span>
            </p>
            <p>
              TVA : <span className="order-summary-values">{taxPrice} €</span>
            </p>

            <hr />

            <p>
              Total : <span className="order-summary-values">{total} €</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={proceedToPayment}
            >
              Paiement
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder;
