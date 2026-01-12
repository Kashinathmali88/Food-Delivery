import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Foods from "./pages/Foods";
import AboutUs from "./pages/AboutUs";
import Footer from "./componets/Footer";
import Checkout from "./pages/Checkout";
import NavBar from "./componets/NavBar";
import MyOrders from "./pages/MyOrders";
import { useDispatch, useSelector } from "react-redux";
import LoginModel from "./componets/LoginModel";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OrderSuccess from "./componets/OrderSuccess";
import { getUser } from "./store/reducers/UserAuthSlice";
import { getFoodList } from "./store/reducers/FoodSlice";
import { getUserCart } from "./store/reducers/CartSlice";
import { getUserOrders } from "./store/reducers/OrderSlice";

const App = () => {
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
      dispatch(getUserOrders());
    }
  }, [user]);

  useEffect(() => {
    dispatch(getFoodList());
  }, []);

  return (
    <>
      {model && <LoginModel setModel={setModel} />}
      <NavBar setModel={setModel} />
      <div className="px-6 md:px-16 lg:px-36 mt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Foods />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders-success" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
