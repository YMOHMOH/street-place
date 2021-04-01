import React from "react";
import { Link } from "react-router-dom";

function Product({ product, col, oldPrice }) {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={product.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Comm)</span>
          </div>

          {oldPrice ? (
            <p className="card-text">
              <span
                style={{
                  color: "grey",
                  textDecoration: "line-through",
                  fontWeight: 300,
                }}
              >
                {oldPrice} €
              </span>{" "}
              <span
                style={{
                  color: "red",
                  fontWeight: 300,
                }}
              >
                {product.price} €
              </span>
            </p>
          ) : (
            <p className="card-text">{product.price} €</p>
          )}

          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
