import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const AboutUs = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center mx-auto">
        About Our Food Delivery App
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        Bringing your favorite meals to your doorstep — fresh, fast, and
        hassle-free.
      </p>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src={assets.aboutus}
          alt="Food delivery"
        />

        <div>
          <h1 className="text-3xl font-semibold">Why Choose Our App</h1>

          <p className="text-sm text-slate-500 mt-2">
            Order from top restaurants, track your delivery in real time, and
            enjoy delicious food anytime.
          </p>

          <div className="flex flex-col gap-10 mt-6">
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 flex justify-center items-center bg-orange-50 border border-indigo-200 rounded">
                ⚡
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Super Fast Delivery
                </h3>
                <p className="text-sm text-slate-500">
                  Get your food delivered hot and fresh in the shortest time
                  possible.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-9 p-2 flex justify-center items-center bg-orange-50 border border-indigo-200 rounded">
                🎨
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Wide Variety of Restaurants
                </h3>
                <p className="text-sm text-slate-500">
                  Choose from local favorites, cafés, and top-rated restaurants
                  near you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-9 p-2 flex justify-center items-center bg-orange-50 border border-indigo-200 rounded">
                🧩
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Easy Ordering & Live Tracking
                </h3>
                <p className="text-sm text-slate-500">
                  Simple checkout, secure payments, and real-time order
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
