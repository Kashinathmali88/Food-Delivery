import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";
import { addToCart, removeFromCart } from "../store/reducers/CartSlice";

const DisheCard = ({ dishe }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="w-60 rounded-md bg-gray-50 shadow-lg overflow-hidden hover:translate-y-1 transition-all delay-100">
      <div className="relative">
        <img src={dishe.image} alt={dishe.name} />
        {!cart[dishe.id] ? (
          <img
            onClick={() =>
              dispatch(addToCart({ productId: dishe.id, quantity: 1 }))
            }
            className="absolute bottom-2 right-4 w-8 h-8 cursor-pointer"
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="flex gap-1 bg-white rounded-full w-fit h-8 p-1 absolute bottom-2 right-4">
            <img
              onClick={() =>
                dispatch(removeFromCart({ productId: dishe.id, quantity: 1 }))
              }
              src={assets.remove_icon_red}
              alt="remove"
              className="cursor-pointer"
            />

            {cart[dishe.id].quantity}
            <img
              onClick={() =>
                dispatch(addToCart({ productId: dishe.id, quantity: 1 }))
              }
              src={assets.add_icon_green}
              alt="add"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center p-2">
        <p className="text-lg font-semibold">{dishe.title}</p>
        <img className="h-4" src={assets.rating_starts} alt="" />
      </div>
      <p className="text-xs p-2">{dishe.description}</p>
      <p className="text-xl font-bold text-orange-500 p-2">${dishe.price}.00</p>
    </div>
  );
};

export default DisheCard;
