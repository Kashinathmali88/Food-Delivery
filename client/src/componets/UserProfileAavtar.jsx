import React from "react";

const UserProfileAvtar = ({ username, setMenu }) => {
  return (
    <>
      <div
        onClick={() => setMenu((p) => !p)}
        className="sm:w-10 sm:h-10 w-7 h-7 flex justify-center items-center bg-orange-50 hover:bg-orange-100 sm:text-xl text-lg font-medium cursor-pointer uppercase rounded-full"
      >
        {username}
      </div>
      <div></div>
    </>
  );
};

export default UserProfileAvtar;
