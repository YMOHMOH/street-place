import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

function OrderDetails({ match }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  // const {
  //   shippingInfo,
  //   orderItems,
  //   paymentInfo,
  //   user,
  //   totalPrice,
  //   orderStatus,
  // } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  let isPaid;
  let shippingDetails;

  if (!loading) {
    shippingDetails =
      order.shippingInfo &&
      `${order.shippingInfo.address}, ${order.shippingInfo.postalCode} ${order.shippingInfo.city}, ${order.shippingInfo.country}`;

    isPaid =
      order.paymentInfo && order.paymentInfo.status === "succeeded"
        ? true
        : false;
  }

  return (
    <Fragment>
      <MetaData title={"Détails de la commande"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Commande # {order._id}</h1>

              <h4 className="mb-4">Livraison</h4>
              <p>
                <b>Identifiant :</b>
                {order.user && order.user.name}
              </p>
              <p>
                <b>Téléphone :</b>{" "}
                {order.shippingInfo && order.shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Adresse:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Montant :</b> {order.totalPrice} €
              </p>

              <hr />

              <h4 className="my-4">Paiement</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Statut de la commande :</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{order.orderStatus}</b>
              </p>

              <h4 className="my-4">Elements de la commande :</h4>

              <hr />
              <div className="cart-item my-1">
                {order.orderItems &&
                  order.orderItems.map((item) => {
                    return (
                      <div key={item.product} className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="65"
                            width="55"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <p id="card_item_size">
                            {item.size === "US" ? "Taille unique" : item.size}
                          </p>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>{item.price} €</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetails;
