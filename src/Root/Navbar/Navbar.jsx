import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { id: 1, title: "Login", url: "/login" },
    { id: 1, title: "Register", url: "/registration" },
  ];
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
          <li>
            <NavLink className="btn btn-neutral text-base-100" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="btn btn-info text-base-100" to="/registration">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
