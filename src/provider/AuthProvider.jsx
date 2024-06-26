import { useEffect, useState } from "react";
import { createContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import swal from "sweetalert";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const loginUser = async (data) => {
    let status = "";
    try {
      const res = await axiosPublic.get(
        `/user?username=${data?.username}&password=${data?.password}`
      );

      if (res?.data?.message === "Username not found") {
        status = res?.data?.message;
      }
      if (res?.data?.message === "Password doesn't match") {
        status = res?.data?.message;
      }
      if (res?.data?._id) {
        swal("Login Success", "You have login successfully", "success");
        localStorage.setItem("user", JSON.stringify(res?.data));
        setUser(res?.data);
        status = "success";
      }
      return status;
    } catch (error) {
      console.error(error.message);
    }
  };

  const userInfo = { user, loginUser, setUser  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
