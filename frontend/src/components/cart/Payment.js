import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import MetaData from "../layout/MetaData";
import Paypal from "../layout/Paypal";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import { SciFooter } from "../../styled/lib";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

function Payment({ history }) {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.total;
  }

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: user.name, email: user.email },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,

            method: "STRIPE",
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("Le paiement n'a pas pu être effectué");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  const successPaymentHandler = () => {
    console.log("success");
    // history.push("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Paiement"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Paiement</h1>
            {/* <Elements
              stripe={loadStripe(
                "pk_test_51HwQMqBtb5s91e5N6hNvaJIePCb1QSzv7HDbsAQ1NoC3QfJpdRysaoCYAQWMkzFVX286qaOVIQ5Ir3rJka6sKarb00BL04iAVX"
              )}
            > */}
            <div className="form-group">
              <label htmlFor="card_num_field">Numéro de carte</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Expiration de la carte</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Payer {` ${orderInfo && orderInfo.total} €`}
            </button>
            <div
              style={{
                displex: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <img
                src="/images/cb.jpg"
                alt="payment"
                width="35px"
                height="30px"
                style={{ marginRight: "5px" }}
              />
              <img
                src="/images/visa.jpg"
                alt="payment"
                width="35px"
                height="30px"
                style={{ marginRight: "5px" }}
              />
              <img
                src="/images/mastercard.jpg"
                alt="payment"
                width="35px"
                height="30px"
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
            {/* </Elements> */}

            {orderInfo && (
              <>
                <h2 className="my-4 text-center">OU</h2>
                <Paypal history={history} />
              </>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Payment;
