import React, { Fragment, useEffect, useState } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

import axios from "axios";

import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

function Paypal({ history }) {
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paypalClientIdSb, setPaypalClientIdSb] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  useEffect(() => {
    getPaypalClientId();
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

  async function getPaypalClientId() {
    const { data } = await axios.get("/api/v1/paypalid");
    setPaypalClientId(data.paypalClientId);
    setPaypalClientIdSb(data.paypalClientIdSandbox);

    setIsLoading(false);
  }

  const onSuccess = (payment) => {
    order.paymentInfo = {
      id: payment.paymentID,
      method: "PAYPAL",
      status: "succeeded",
    };

    dispatch(createOrder(order));

    history.push("/success");
    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!", payment);
    alert.success("Le paiement a été effectué");
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log("Le paiement a été annulé", data);
    alert.error("Le paiement a été annulé");
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    alert.error("Le paiement n'a pas pu être effectué");
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox"; // you can set here to 'production' for production
  let currency = "EUR"; // or you can set this value from your props or state
  let total = Number(orderInfo.total); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    sandbox: paypalClientIdSb || "sb",
    production: paypalClientId || "live",
  };

  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "responsive",
            tagline: "false",
            label: "paypal",
          }}
        />
      )}
    </>
  );
}

export default Paypal;
