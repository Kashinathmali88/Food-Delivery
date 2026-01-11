import React from "react";
import { useSelector } from "react-redux";

const SubTotal = () => {
  const { subTotal, deliveryChagres } = useSelector((state) => state.cart);
  return (
    <>
      <h1 className="text-2xl font-semibold">Cart Totals</h1>
      <p className="text-sm font-semibold text-gray-500 flex justify-between py-2 border-b border-black/20">
        Subtotal <span className="text-sm font-bold">{subTotal}$</span>
      </p>

      <p className="text-sm font-semibold text-gray-500 flex justify-between py-2 border-b border-black/20">
        Delivery Fee <span className="text-sm font-bold">5$</span>
      </p>

      <p className="text-sm font-semibold text-gray-500 flex justify-between py-2 border-b border-black/20">
        Total{" "}
        <span className="text-sm font-bold">
          {subTotal + subTotal != 0 && deliveryChagres}$
        </span>
      </p>
    </>
  );
};

export default SubTotal;
