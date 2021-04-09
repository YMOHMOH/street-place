import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
/* import "./style.css"; */

import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { clearErrors } from "../actions/userActions";
import { useAlert } from "react-alert";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function Home({ match }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = ["Hoodies", "Doudounes"];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const auth = useSelector((state) => state.auth);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    if (auth.error) {
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    price,
    category,
    rating,
    auth.error,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Achetez les meilleurs produits en ligne"} />
          <h1 id="products_heading">Produits</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {/* {keyword ? (
                <Fragment>
                   <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{ 1: `1€`, 150: `150€` }}
                        min={1}
                        max={150}
                        defaultValue={[1, 150]}
                        tipFormatter={(value) => `${value}€`}
                        tipProps={{ placement: "top", visible: true }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Catégories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => {
                            return (
                              <li
                                key={category}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Notes</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => {
                            return (
                              <li
                                key={star}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{ width: `${star * 20}%` }}
                                  ></div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div> 
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => {
                          return (
                            <Product
                              key={product._id}
                              product={product}
                              col={4}
                            />
                          );
                        })}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => {
                  return (
                    <Product key={product._id} product={product} col={3} />
                  );
                })
              )}*/}
              {products &&
                products.map((product, index) => {
                  if (product.name === "Sons Puffer One") {
                    return (
                      <Product
                        key={product._id}
                        product={product}
                        col={4}
                        oldPrice={59.99}
                        promo={true}
                      />
                    );
                  }
                  if (
                    product.name === "Hoodies Massa" ||
                    product.name === "Hoodies Massa White" ||
                    product.name === "Hoodies Massa Rouge - unisexe" ||
                    product.name === "Hoodies Massa Gris - unisexe" ||
                    product.name === "Urban"
                  ) {
                    return (
                      <Product
                        key={product._id}
                        product={product}
                        col={4}
                        oldPrice={49.99}
                        promo={true}
                      />
                    );
                  }
                  if (
                    product.name === "Signature - unisexe" ||
                    product.name === "Signature Kaki - unisexe"
                  ) {
                    return (
                      <Product
                        key={product._id}
                        product={product}
                        col={4}
                        oldPrice={29.99}
                        promo={true}
                      />
                    );
                  }
                  return (
                    <Product key={product._id} product={product} col={4} />
                  );
                })}
            </div>
          </section>

          {resPerPage < count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                // nextPageText="Suivant"
                // prevPageText="Précédent"
                // firstPageText="Première"
                // lastPageText="Dernière"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
