import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import swal from "sweetalert";

const ResetPasswordModal = ({ setIsResetFormOpen }) => {
  const { register, handleSubmit } = useForm();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleResetPassword = async (data) => {
    try {
      const res = await axiosPublic.patch("/reset-user-password", data);
      if (res?.data?.modifiedCount) {
        swal(
          "Success",
          "Your password have been reset, Please Login",
          "success"
        );
      }
      if (!res?.data?.modifiedCount) {
        swal("Sorry!!", "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsResetFormOpen(false);
    }
  };
  const handelShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="fixed bg-black bg-opacity-70 flex top-0 items-center min-h-screen justify-center w-full  z-50">
      <div className="border md:p-10 p-5 rounded-lg w-full my-6 mx-auto lg:max-w-[40%] bg-white max-w-[90%]">
        <div className="mb-3 flex items-enter justify-between">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <button
            onClick={() => setIsResetFormOpen(false)}
            className="relative md:-top-5 -top-3 md:-right-5 -right-3"
          >
            <TiDelete className="text-3xl text-red-400" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-1"
        >
          <div>
            <label className="label">
              <strong className="label-text">Your Email</strong>
            </label>
            <input
              {...register("email")}
              className="bg-base-200 text-base-content w-full focus:outline-none border-2 py-2.5 px-4 rounded-lg focus:border-blue-300  "
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label className="label">
              <strong className="label-text">New Password</strong>
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              {...register("password")}
              placeholder="New password"
              className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
              minLength={6}
              required
            />

            {/* password show eye off-on */}
            <div className="absolute right-3 bottom-4">
              {isShowPassword ? (
                <span className="cursor-pointer" onClick={handelShowPassword}>
                  <LuEye />
                </span>
              ) : (
                <span className="cursor-pointer" onClick={handelShowPassword}>
                  <LuEyeOff />
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 text-center">
            <input
              type="submit"
              className="btn btn-neutral btn-wide text-base-100"
              value="Reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

ResetPasswordModal.propTypes = {
  setIsResetFormOpen: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
