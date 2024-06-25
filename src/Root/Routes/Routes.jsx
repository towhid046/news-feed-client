import { createBrowserRouter } from "react-router-dom";
import Root from "./../Root";
import Home from "../../pages/Home/Home";
import Login from "./../../pages/Login/Login";
import Registration from "./../../pages/Registration/Registration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default routes;
