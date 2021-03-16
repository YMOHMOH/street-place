import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import "../../App.css";

import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";

function Header() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav className="navbar row" style={{ padding: "0rem 1rem" }}>
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="/images/streetplace_logo.png"
                style={{ height: "80px" }}
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Panier
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "/images/default_avatar.jpg"
                    }
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span style={{ color: "black" }}>{user && user.name}</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="">
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Commandes
                </Link>
                <Link className="dropdown-item" to="/me">
                  Mon compte
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Deconnexion
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Connexion
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
