import toast from "react-hot-toast";
import SubTotal from "../componets/SubTotal";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { palceOrder } from "../store/reducers/OrderSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.order);

  const { cart, subTotal, deliveryChagres } = useSelector(
    (state) => state.cart
  );

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const validators = {
    firstName: (v) =>
      v.trim().length >= 2 ? "" : "First name must be at least 2 characters",

    lastName: (v) =>
      v.trim().length >= 2 ? "" : "Last name must be at least 2 characters",

    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",

    street: (v) => (v.trim().length >= 5 ? "" : "Street address is too short"),

    city: (v) =>
      v.trim().length >= 2 ? "" : "City must be at least 2 characters",

    state: (v) =>
      v.trim().length >= 2 ? "" : "State must be at least 2 characters",

    country: (v) =>
      v.trim().length >= 2 ? "" : "Country must be at least 2 characters",

    zipCode: (v) =>
      /^[1-9][0-9]{5}$/.test(v) ? "" : "Enter a valid 6-digit Indian PIN code",

    phone: (v) =>
      /^[6-9]\d{9}$/.test(v)
        ? ""
        : "Enter a valid 10-digit Indian mobile number",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    Object.values(address).every(
      (value) => value !== null && value.toString().trim() !== ""
    );

  const handelPlaceOrder = (e) => {
    e.preventDefault();
    if (!address || !cart || !subTotal) {
      alert("plz add all data");
      return;
    }
    const data = { items: cart, amount: subTotal + deliveryChagres, address };
    dispatch(palceOrder(data));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/orders-success");
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (!user) {
      toast.error("plz login first");
      navigate("/");
    }
  }, [user]);

  return (
    <form onSubmit={handelPlaceOrder}>
      <div className="min-h-[50vh] flex flex-col md:flex-row">
        {/* All cart items */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-2xl font-semibold">Delivery Information</h1>
          <div className="mt-2 flex gap-2">
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="First name"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-red-500 text-xs mb-2">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="Last name"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-red-500 text-xs mb-2">{errors.lastName}</p>
              )}
            </div>
          </div>
          <input
            className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="email"
            placeholder="Email address"
            name="email"
            value={address.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email}</p>
          )}
          <input
            className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="Street"
            name="street"
            value={address.street}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.street && errors.street && (
            <p className="text-red-500 text-xs mb-2">{errors.street}</p>
          )}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="City"
                name="city"
                value={address.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city && (
                <p className="text-red-500 text-xs mb-2">{errors.city}</p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="State"
                name="state"
                value={address.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.state && errors.state && (
                <p className="text-red-500 text-xs mb-2">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="Zip code"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.zipCode && errors.zipCode && (
                <p className="text-red-500 text-xs mb-2">{errors.zipCode}</p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="text"
                placeholder="Country"
                name="country"
                value={address.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.country && errors.country && (
                <p className="text-red-500 text-xs mb-2">{errors.country}</p>
              )}
            </div>
          </div>

          <input
            className="w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="Phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
          )}
        </div>
        {/* Total  */}
        <div className="md:w-1/2 w-full md:px-7 md:mt-0 mt-7">
          <SubTotal />
          <button
            disabled={!isFormValid}
            type="submit"
            className={`px-4 py-2 bg-orange-400 hover:bg-orange-600 text-white mt-2 cursor-pointer rounded-md active:scale-95`}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
