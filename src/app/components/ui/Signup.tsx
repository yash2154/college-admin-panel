"use client";

import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Signup({ heading }: any) {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    followUp: "",
  });

  const { loading, signup } = useSignup();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signup(inputs);
    setInputs({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      followUp: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto  rounded-lg  shadow-lg bg-zinc-900 ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          {heading} <span className="text-blue-500"> college admin panel</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="enter your name"
              className="w-full input input-bordered  h-10"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="enter your username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <div
                className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-black dark:text-white text-xl" />
                ) : (
                  <IoEyeOutline className="text-black dark:text-white text-xl" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <div className=" relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
              <div
                className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaRegEyeSlash className="text-black dark:text-white text-xl" />
                ) : (
                  <IoEyeOutline className="text-black dark:text-white text-xl" />
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                who is your favourite superhero?
              </span>
            </label>
            <input
              type="text"
              placeholder="superhero"
              className="w-full input input-bordered h-10"
              value={inputs.followUp}
              onChange={(e) =>
                setInputs({ ...inputs, followUp: e.target.value })
              }
            />
          </div>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-sky-600 hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
