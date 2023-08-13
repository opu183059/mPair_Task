import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Authcontext } from "./provider/Authprovider";

const Navbar = () => {
  const { user, Logout } = useContext(Authcontext);
  console.log(user?.email);
  const SignOut = () => {
    Logout();
    Navigate("/");
  };
  return (
    <div className="flex justify-between items-center shadow-sm p-5 fixed backdrop-blur-lg w-full text-slate-50">
      <div className="left">
        <Link to={"/"} className="text-2xl font-bold">
          m<span className="text-blue-500">P</span>air
        </Link>
      </div>
      <div className="right font-semibold">
        {user ? (
          <>
            <a href="#" className="mr-4">
              {user?.email}
            </a>
            <button
              onClick={SignOut}
              className="px-2 py-1 bg-blue-500 hover:bg-blue-700 duration-300 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="mr-4 hover:text-blue-500">
              Login
            </Link>
            <Link to={"/registration"} className="hover:text-blue-500">
              Registration
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
