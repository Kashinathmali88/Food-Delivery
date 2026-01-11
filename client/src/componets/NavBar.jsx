import React, { useEffect, useState } from "react";
import UserProfileAvtar from "./UserProfileAavtar";
import MobileMenuIcon from "../Icons/MobileMenuIcon";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/UserAuthSlice";
import { assets } from "../assets/frontend_assets/assets";

const NavBar = ({ setModel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="px-6 md:px-16 lg:px-36 w-full flex justify-between py-4 text-gray-500 fixed top-0 left-0 bg-white z-50">
      {/* Logo */}
      <img src={assets.logo} className="h-6 sm:h-8" alt="" />
      {/* Large menu */}
      <div className="hidden sm:flex md:gap-8 gap-4 items-center">
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-2 border-gray-500" : ""
          }
          to={"/"}
        >
          home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-2 border-gray-500" : ""
          }
          to={"/menu"}
        >
          menu
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-2 border-gray-500" : ""
          }
          to={"/about-us"}
        >
          about us
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-2 border-gray-500" : ""
          }
          to={"/orders"}
        >
          my orders
        </NavLink>
      </div>
      {/* Login button */}
      <div className="flex md:gap-4 gap-2 items-center relative">
        <img
          className="sm:w-6 sm:h-6 w-4 h-4"
          src={assets.search_icon}
          alt=""
        />
        <span className="relative">
          <img
            onClick={() => navigate("/cart")}
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer"
            src={assets.basket_icon}
            alt=""
          />
          {Object.keys(cart)?.length > 0 && user && (
            <p className="sm:w-3 sm:h-3 h-2 w-2 bg-orange-500 rounded-full absolute top-[-30%] right-1 animate-bounce delay-200"></p>
          )}
        </span>

        {user && isAuthenticated ? (
          <UserProfileAvtar username={user.username[0]} setMenu={setMenu} />
        ) : (
          <button
            onClick={() => setModel(true)}
            className="border border-orange-400 hover:bg-orange-100 active:scale-95 active:bg-orange-500 rounded-full sm:px-4 px-2 sm:py-1 py-0.5 cursor-pointer"
          >
            sign in
          </button>
        )}
        <div
          className={`${
            menu && isAuthenticated && user ? "block" : "hidden"
          } absolute right-0 top-12 w-40  bg-white border rounded-md p-2 transition-all delay-1000 cursor-pointer`}
        >
          <p>{user?.username}</p>
          <button
            onClick={() => dispatch(logout())}
            className="flex gap-2 items-center"
          >
            Logout{" "}
            <img
              className="w-5 h-5 cursor-pointer"
              src={assets.logout_icon}
              alt="logout_icon"
            />
          </button>
        </div>
        <div
          onClick={() => setMobileMenu((prev) => !prev)}
          className="sm:hidden relative"
        >
          <MobileMenuIcon />
          {mobileMenu && (
            <div className="w-40 bg-orange-50 text-black font-semibold border border-orange-400 absolute top-7 right-0 rounded-md flex flex-col">
              <NavLink
                className={({ isActive }) =>
                  `px-6 py-1 text-center hover:bg-orange-400 ${
                    isActive ? "bg-orange-500" : "bg-orange-400/30"
                  }`
                }
                to={"/"}
              >
                home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `px-6 py-1 text-center ${
                    isActive ? "bg-orange-500" : "bg-orange-400/30"
                  }`
                }
                to={"/menu"}
              >
                menu
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `px-6 py-1 text-center ${
                    isActive ? "bg-orange-500" : "bg-orange-400/30"
                  }`
                }
                to={"/about-us"}
              >
                about us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `px-6 py-1 text-center ${
                    isActive ? "bg-orange-500" : "bg-orange-400/30"
                  }`
                }
                to={"/orders"}
              >
                my orders
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
