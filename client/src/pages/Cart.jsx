import toast from "react-hot-toast";
import SubTotal from "../componets/SubTotal";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, setSubTotal } from "../store/reducers/CartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { foods } = useSelector((state) => state.foods);
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = [];
    let totalAmount = 0;
    for (const id in cart) {
      let quantity = cart[id].quantity;
      let food = foods.find((f) => f.id === id);
      if (!food) continue;
      let total = food.price * quantity;
      totalAmount += total;
      temp.push({ ...food, total, quantity });
    }
    setItems(temp);
    dispatch(setSubTotal(totalAmount));
  }, [cart]);

  useEffect(() => {
    if (!user) {
      toast.error("plz login first");
      navigate("/");
      return;
    }
    if (!cart) {
      toast.error("first add food in cart");
      navigate("/menu");
      return;
    }
    if (Object.keys(cart).length === 0) {
      toast.error("plz add food to your cart");
      navigate("/menu");
    }
    dispatch(getUserCart());
  }, []);
  return (
    <div className="min-h-[50vh] flex flex-col md:flex-row">
      {/* All cart items */}
      <div className="md:w-1/2 w-full h-fit overflow-x-scroll">
        <table>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr
                  className="bg-gray-50 border-b text-sm font-medium border-black/20"
                  key={index}
                >
                  <td className="px-4 py-2">
                    <img
                      className="w-10 h-10 rounded-md"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Total  */}
      <div className="md:w-1/2 w-full md:px-7 md:mt-0 mt-7">
        <SubTotal />

        <button
          onClick={() => navigate("/checkout")}
          className={`px-4 py-2 bg-orange-400 hover:bg-orange-600 text-white mt-2 cursor-pointer rounded-md active:scale-95`}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
