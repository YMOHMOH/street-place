import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import ListReviews from "../../components/review/ListReviews";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

function ProductDetails({ match }) {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState("M");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { user } = useSelector((state) => state.auth);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Votre commentaire a été posté avec succés");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, match.params.id, reviewError, success, size]);

  const addToCart = (currentSize) => {
    dispatch(addItemToCart(match.params.id, quantity, currentSize));
    alert.success("Produit ajouté au panier");
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (!product.withSize) {
      if (count.valueAsNumber >= product.stock["US"]) {
        return;
      }
    } else {
      if (count.valueAsNumber >= product.stock[size]) {
        return;
      }
    }

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) {
      return;
    }

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setUserRatings = () => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  };

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    dispatch(newReview(formData));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => {
                    return (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block "
                          // w-100
                          src={image.url}
                          alr={product.title}
                          style={{
                            width: "28rem",
                            height: "40rem",
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              {/* <p id="product_id">Produit # {product._id}</p> */}

              <hr />
              <a href="#reviews" style={{ cursor: "pointer" }}>
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>

                <span id="no_of_reviews">({product.numOfReviews} Comm)</span>
              </a>

              <hr />

              <p id="product_price">{product.price} €</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-primary minus"
                  onClick={decreaseQty}
                  style={{
                    color: "#fa9c23",
                    background: "white",
                    border: "1px solid #fa9c23",
                  }}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span
                  className="btn btn-primary plus"
                  onClick={increaseQty}
                  style={{
                    color: "#fa9c23",
                    background: "white",
                    border: "1px solid #fa9c23",
                  }}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={
                  product.stock && !product.withSize
                    ? product.stock["US"] === 0
                    : product.stock && product.stock[size] === 0
                }
                onClick={() => {
                  if (product.stock) {
                    if (!product.withSize) {
                      addToCart("US");
                    } else {
                      addToCart(size);
                    }
                  }
                }}
              >
                Ajouter au panier
              </button>
              {product.withSize && (
                <div className="form-group my-3">
                  <label htmlFor="size_field">Taille</label>
                  {/* className="form-control" */}
                  <select
                    className="mx-2"
                    id="size_field"
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                      setQuantity(1);
                    }}
                  >
                    {sizes.map((size) => {
                      return (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              <hr />

              <p>
                <span
                  id="stock_status"
                  className={
                    product.stock && !product.withSize
                      ? product.stock["US"] > 0
                        ? "greenColor"
                        : "redColor"
                      : product.stock && product.stock[size] > 0
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {product.stock && !product.withSize
                    ? product.stock["US"] > 0
                      ? `En Stock : ${product.stock["US"]}`
                      : "Indisponible"
                    : product.stock && product.stock[size] > 0
                    ? `En Stock : ${product.stock[size]}`
                    : "Indisponible"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Vendeur : <strong>{product.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Faire un commentaire
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Se connecter pour faire un commentaire.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Commentaire
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Envoyer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
