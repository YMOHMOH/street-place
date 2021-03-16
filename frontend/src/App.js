import { useEffect, useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  withRouter,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

//Cart Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

//Orer Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import Login from "./components/user/login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Info imports
import ShipInfo from "./components/info/ShipInfo";
import PaymentInfo from "./components/info/PaymentInfo";
import CgvInfo from "./components/info/CgvInfo";
import LegalNoticeInfo from "./components/info/LegalNoticeInfo";

// Admin imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { userReducer } from "./reducers/userReducers";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarker,
  faPhone,
  faEnvelope,
  faWindowClose,
  faMinus,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMapMarker,
  faPhone,
  faEnvelope,
  faWindowClose,
  faMinus,
  faPlus,
  faStar
);

function _ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const ScrollToTop = withRouter(_ScrollToTop);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapi");
    setStripeApiKey(data.stripeApiKey);
  }
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/shipping/info" component={ShipInfo} exact />
          <Route path="/payment/info" component={PaymentInfo} exact />
          <Route path="/cgv/info" component={CgvInfo} exact />
          <Route path="/legalNotice/info" component={LegalNoticeInfo} exact />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} exact />
            </Elements>
          )}

          <Route path="/login">
            <Login getStripeApiKey={getStripeApiKey} />
          </Route>
          <Route path="/register">
            <Register getStripeApiKey={getStripeApiKey} />
          </Route>
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />
        <Footer />
        {/* {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />} */}
      </div>
    </Router>
  );
}

export default App;
