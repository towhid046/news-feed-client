import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
