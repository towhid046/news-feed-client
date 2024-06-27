import { Link, NavLink } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import { LuUserCheck, LuUserPlus } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogOutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    swal("Logout Success", "You have logout successfully", "success");
  };

  return (
    <nav className="py-5 bg-white px-4 shadow-sm z-50 sticky top-0">
      <div className="container mx-auto flex justify-between  items-center gap-2">
        <h2 className="">
          <Link
            className="btn btn-ghost text-3xl font-bold bg-gradient-to-r from-black to-blue-400 text-transparent bg-clip-text"
            to="/"
          >
            NewsFeed
          </Link>
        </h2>
        <ul className="flex items-center gap-3 menu-special-class">
          {user ? (
            <div className="flex items-center gap-3">
              <li>
                <button
                  onClick={handleLogOutUser}
                  className="btn btn-neutral text-base-100"
                >
                  Log Out
                </button>
              </li>
              <li>
                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user?.username}
                  className="btn btn-info text-base-100"
                >
                  <LuUserCheck className="text-2xl" />
                </button>
              </li>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <li>
                <NavLink
                  className="btn btn-info text-base-100"
                  to="/registration"
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Login"
                  className="btn btn-neutral text-base-100"
                  to="/login"
                >
                  <LuUserPlus className="text-2xl" />
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default Navbar;
