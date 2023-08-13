/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Authcontext } from "../provider/Authprovider";

const Login = () => {
  const { setUser } = useContext(Authcontext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(JSON.parse(localStorage.getItem("userData")));
      navigate(from);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Successfull",
      });
      setErrorMessage("");
      //   console.log(user);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Login failed ",
      });
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://img.lovepik.com/background/20211021/large/lovepik-cool-line-technology-banner-background-image_400112106.jpg')] bg-cover pt-32">
      <div className="max-w-6xl mx-auto items-center">
        <div className="flex items-center justify-center"></div>
        <form
          onSubmit={handleLogin}
          action=""
          noValidate=""
          className="md:w-1/2 w-10/12 mt-5 md:mt-0 flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid backdrop-blur-2xl rounded-md text-gray-50"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <h1 className="text-2xl text-sky-300 font-semibold">Login</h1>
              <div className="col-span-full text-left">
                <label htmlFor="sellerEmail" className="text-sm text-gray-50">
                  Email
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  className="w-full h-9 ps-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400 border-gray-700 text-gray-900"
                />
              </div>
              <div className="col-span-full text-left">
                <label htmlFor="sellerEmail" className="text-sm text-gray-50">
                  Password
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  type="password"
                  className="w-full h-9 ps-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400 border-gray-700 text-gray-900"
                />
              </div>
              <div className="col-span-full w-full text-left mt-3">
                <p className="text-red-500">{errorMessage}</p>
                <p>
                  Don't have an account? goto{" "}
                  <Link
                    to={"/registration"}
                    className=" hover:underline hover:text-sky-500"
                  >
                    Registration
                  </Link>
                </p>
              </div>
              <div className="col-span-full w-full mt-3">
                <input
                  type="submit"
                  value="Login"
                  className="px-3 py-1 bg-sky-500 hover:bg-sky-700 transition-all duration-300 rounded uppercase text-gray-50"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
