import Loading from "./Loading";
import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  loginUser,
  registerUser,
} from "../store/reducers/UserAuthSlice";

const LoginModel = ({ setModel }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState("login");
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const validators = {
    username: (v) =>
      v.trim().length >= 3 ? "" : "Username must be at least 3 characters",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email",
    password: (v) => {
      if (!v) return "Password is required";
      if (v.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(v)) return "Password must contain one uppercase letter";
      if (!/[a-z]/.test(v)) return "Password must contain one lowercase letter";
      if (!/\d/.test(v)) return "Password must contain one number";
      if (!/[@$!%*?&]/.test(v))
        return "Password must contain one special character";
      return "";
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.entries(data).every(([key, value]) => {
      if (state === "login" && key === "username") return true;
      return value;
    });

  const handelSubmit = (e) => {
    e.preventDefault();
    state === "login"
      ? dispatch(loginUser(data)).then(() => dispatch(getUser()))
      : dispatch(registerUser(data)).then(() => dispatch(getUser()));
  };

  useEffect(() => {
    isAuthenticated && setModel(false);
  }, [isAuthenticated, setModel]);

  return (
    <div
      onClick={() => setModel(false)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-60"
    >
      <form
        onSubmit={(e) => handelSubmit(e)}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        {" "}
        {!loading ? (
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {state === "login" ? "Sign In" : "Sign Up"}
              </h2>
              <p
                onClick={() => setModel(false)}
                className="font-semibold text-xl cursor-pointer"
              >
                <span className="hover:bg-orange-500/30 hover:text-black px-2 rounded-full">
                  X
                </span>
              </p>
            </div>

            <input
              id="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={data.username}
              className={`${
                state == "login" ? "hidden" : ""
              } w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3`}
              type="text"
              placeholder="Username"
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-xs mb-2">{errors.username}</p>
            )}
            <input
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={data.email}
              className={`w-full border mt-1 bg-orange-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3`}
              type="email"
              placeholder="Email"
              required
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email}</p>
            )}
            <input
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={data.password}
              className="w-full border mt-1 bg-orange-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
              type="password"
              placeholder="Password"
              required
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mb-2">{errors.password}</p>
            )}

            <button
              disabled={!isFormValid}
              className="w-full mb-3 bg-orange-500 hover:bg-orange-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer"
            >
              {state === "login" ? "Login" : "Create Account"}
            </button>

            <p className="text-center mt-4">
              {state === "login"
                ? "Create an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-orange-500 underline cursor-pointer"
                onClick={() => setState(state === "login" ? "signup" : "login")}
              >
                {state === "login" ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Loading size={10} />
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginModel;
