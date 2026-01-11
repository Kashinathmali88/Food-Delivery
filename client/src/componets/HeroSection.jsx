import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative rounded-xl overflow-hidden text-white">
      {/* Background Image */}
      <img
        className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] object-cover"
        src={assets.header_img}
        alt=""
      />
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
        <h1 className="fade-step step-3 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          Order your
        </h1>
        <h1 className="fade-step step-2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-4">
          favourite food here
        </h1>
        <p className="fade-step step-1 mt-4 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-2 bg-white text-gray-700 rounded-full mt-5 shadow active:scale-95 hover:bg-gray-100 w-fit"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
