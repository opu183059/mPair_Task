/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;

    try {
      axios.post(`http://localhost:5000/users/${email}`, {
        email: email,
        password: password,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration completed successfully redirected to login",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Registration failed",
      });
    }
  };
  return (
    <div className="min-h-screen bg-[url('https://img.lovepik.com/background/20211021/large/lovepik-cool-line-technology-banner-background-image_400112106.jpg')] bg-cover pt-32">
      <div className="max-w-6xl mx-auto items-center">
        <div className="flex items-center justify-center"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          noValidate=""
          className="md:w-1/2 w-10/12 mt-5 md:mt-0 flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid backdrop-blur-2xl rounded-md text-gray-50"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <h1 className="text-2xl text-sky-300 font-semibold">
                Registration
              </h1>
              <div className="col-span-full text-left">
                <label htmlFor="sellerEmail" className="text-sm text-gray-50">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  className="w-full h-9 ps-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400 border-gray-700 text-gray-900"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="col-span-full text-left">
                <label htmlFor="sellerEmail" className="text-sm text-gray-50">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  })}
                  id="password"
                  name="password"
                  type="password"
                  className="w-full h-9 ps-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400 border-gray-700 text-gray-900"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password have to be more than 6 characters
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have at least one Capital letter and one
                    special character.
                  </p>
                )}
              </div>
              <div className="col-span-full w-full text-left mt-3">
                <p>
                  Already have an account? goto{" "}
                  <Link
                    to={"/login"}
                    className=" hover:underline hover:text-sky-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="col-span-full w-full mt-3">
                <input
                  //   onClick={save}
                  type="submit"
                  value="Register"
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

export default Registration;
