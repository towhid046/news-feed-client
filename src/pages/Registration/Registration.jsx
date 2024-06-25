import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { scrollToTop } from "./../../utilities/scrollToTop";
import swal from "sweetalert";
import { Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import axios from "axios";

const Registration = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handelRegisterForm = async (data) => {
    setPasswordError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user`, data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <Slide direction="down">
        <section className="my-12 container mx-auto px-4">
          <div className="w-full">
            <div
              className={`max-w-xl bg-base-100 mx-auto md:p-12 py-5 px-4 border rounded-lg`}
            >
              <h2 className="text-2xl font-bold text-center ">
                Register Your Account
              </h2>
              <form
                onSubmit={handleSubmit(handelRegisterForm)}
                className="mt-5 text-black"
              >
                {/* Email input */}
                <div>
                  <label className="label">
                    <strong className="label-text">Email</strong>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                    required
                  />
                </div>
                {/* Username input */}
                <div>
                  <label className="label">
                    <strong className="label-text">Username</strong>
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="User name"
                    className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                    required
                  />
                </div>
                {/* Password input */}
                <div className="relative">
                  <label className="label">
                    <strong className="label-text">Password</strong>
                  </label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                    required
                  />

                  {/* password show eye off-on */}
                  <div className="absolute right-3 bottom-4">
                    {isShowPassword ? (
                      <span
                        className="cursor-pointer"
                        onClick={handelShowPassword}
                      >
                        <LuEye />
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={handelShowPassword}
                      >
                        <LuEyeOff />
                      </span>
                    )}
                  </div>
                </div>
                <small className="text-red-600">{passwordError}</small>

                {/* Trams and condition */}
                <div className="flex items-center gap-1 mt-6">
                  <input
                    type="checkbox"
                    id="terms-condition"
                    className="checkbox checkbox-sm  "
                  />
                  <label htmlFor="terms-condition" className="cursor-pointer">
                    <p>Accept Term & Conditions </p>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn w-full   btn-info text-base-100">
                    Register
                  </button>
                </div>
              </form>

              <p className="text-center mt-5">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className=" cursor-pointer link link-info italic font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Slide>
    </div>
  );
};

export default Registration;
