import React from "react";

const Loading = ({ size }) => {
  return (
    <div
      className={`w-${size} h-${size} rounded-full border-4 border-gray-200 border-t-orange-500 animate-spin transition-all delay-300`}
    ></div>
  );
};

export default Loading;
