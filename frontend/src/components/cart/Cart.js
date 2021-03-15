import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

function Cart({ history }) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id, size) => {
    dispatch(removeItemFromCart(id, size));
  };

  const increaseQty = (id, quantity, size, stock) => {
    console.log(id, quantity, size, stock);
    const newQty = quantity + 1;

    if (newQty > stock) {
      return;
    }
    dispatch(addItemToCart(id, newQty, size));
  };

  const decreaseQty = (id, quantity, size) => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      return;
    }
    dispatch(addItemToCart(id, newQty, size));
  };

  const subTotalHandler = () => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  };

  const checkoutHandler = () => {
    history.push("login?redirect=shipping");
  };

  const totalHandler = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    return totalPrice.toFixed(2);
  };

  return (
    <Fragment>
      <MetaData title={"Mon Panier"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Votre Panier est vide</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Votre Panier: <b>{cartItems.length} éléments</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item, index) => {
                return (
                  <Fragment>
                    <hr />
                    <div className="cart-item" key={index}>
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="115"
                            width="90"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <p id="card_item_size">
                            {item.size === "US" ? "Taille unique" : item.size}
                          </p>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">{item.price} €</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQty(
                                  item.product,
                                  item.quantity,
                                  item.size
                                )
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.size,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() =>
                              removeCartItemHandler(item.product, item.size)
                            }
                          ></i>
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
                  Quantité:
                  <span className="order-summary-values">
                    {" "}
                    {subTotalHandler()} (Unités)
                  </span>
                </p>
                <p>
                  Total:
                  <span className="order-summary-values">
                    {totalHandler()} €
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Vérifier la commande
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
