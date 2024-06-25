import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { UserContext } from "../../providers/AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { scrollToTop } from "./../../utilities/scrollToTop";
import swal from "sweetalert";
import { Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handelLoginForm = async (data) => {
    setPasswordError(null);
    console.log(data);
  };

  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <Slide direction="down">
        <div className="my-12">
          <div className="w-full">
            <div
              className={`max-w-xl bg-base-100 mx-auto md:p-12 py-5 px-4 border rounded-lg`}
            >
              <h2 className="text-2xl font-bold text-center ">
                Login Your Account
              </h2>
              <form
                onSubmit={handleSubmit(handelLoginForm)}
                className="mt-5 text-black"
              >
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
                <div className="form-control mt-6">
                  <button className="btn w-full   btn-info text-base-100">
                    Login
                  </button>
                </div>
              </form>

              <p className="text-center mt-5">
                Haven't an account?{" "}
                <Link
                  to={"/registration"}
                  className=" cursor-pointer link link-info italic font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Login;