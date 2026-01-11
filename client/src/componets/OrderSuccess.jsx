import CheckCircle from "../Icons/CheckCircle";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-scaleIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-orange-500 animate-bounceOnce" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed and is
          being processed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full cursor-pointer border border-orange-500 text-orange-500 hover:bg-orange-100 font-semibold py-3 rounded-xl transition-all duration-300"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
