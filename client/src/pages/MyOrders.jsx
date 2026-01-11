import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";
import { getUserOrders } from "../store/reducers/OrderSlice";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.foods);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <>
      <h1 className="text-4xl text-gray-800">Order list</h1>
      <div className="mt-7 flex flex-col items-center gap-2 max-h-screen overflow-y-scroll">
        {orders?.map((order) => {
          return (
            <div
              key={order.id}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={assets.parcel_icon}
                  alt="boxIcon"
                />
                <div>
                  {Object.keys(order.items).map((item) => {
                    let currFood = foods.find((food) => food.id === item);
                    if (!currFood) return;
                    return (
                      <div
                        key={currFood.id}
                        className="flex flex-col justify-center"
                      >
                        <p className="font-medium">
                          {currFood.title}{" "}
                          <span
                            className={`text-orange-500 ${
                              order.items[item].quantity < 2 && "hidden"
                            }`}
                          >
                            x {order.items[item].quantity}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium mb-1">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state},{order.address.zipcode},{" "}
                  {order.address.country}
                </p>
              </div>

              <p className="font-medium text-base my-auto text-black/70">
                ${order.amount}
              </p>

              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentMethod}</p>
                <p>
                  Date: {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyOrders;
