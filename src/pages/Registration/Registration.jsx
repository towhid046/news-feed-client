import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(null);
  const [invalidPassword, setInvalidPassword] = useState(null);

  const { register, handleSubmit } = useForm();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handelRegisterForm = async (data) => {
    if (invalidPassword || invalidUsername) {
      return;
    }

    try {
      const res = await axiosPublic.post(`/user`, data);
      if (res?.data?.insertedId) {
        swal(
          "Register Success",
          "Thank you for your registration, Please Login",
          "success"
        );
        navigate("/login");
      }
      if (res.data?.message) {
        swal("Opps!", `${res?.data?.message}`, "warning");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleOnChangeUsername = async (value) => {
    setInvalidUsername(null);
    const res = await axiosPublic.get(`/username-status?username=${value}`);
    if (res.data?.message === "username already exist, try another") {
      return setInvalidUsername(res.data?.message);
    }
    if (/[A-Z]/.test(value)) {
      setInvalidUsername(`Username should't contain any UPPERCASE`);
    }
    if (/[\s]/.test(value)) {
      setInvalidUsername(`Username should't contain any space`);
    }
  };

  const handleOnChangePassword = (pass) => {
    setInvalidPassword(null);
    if (pass.length < 6) {
      setInvalidPassword("Password length must be at least 6 characters");
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
                    onChange={(e) => handleOnChangeUsername(e.target.value)}
                    placeholder="User name"
                    className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                    required
                  />
                  <small className="text-red-600">{invalidUsername}</small>
                </div>

                {/* Password input */}
                <div className="relative">
                  <label className="label">
                    <strong className="label-text">Password</strong>
                  </label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    {...register("password")}
                    onChange={(e) => handleOnChangePassword(e.target.value)}
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
                <small className="text-red-600">{invalidPassword}</small>

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
