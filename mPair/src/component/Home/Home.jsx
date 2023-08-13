/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[url('https://img.lovepik.com/background/20211021/large/lovepik-cool-line-technology-banner-background-image_400112106.jpg')] bg-cover flex flex-col gap-8 justify-center items-center pt-20">
      <h1 className="text-blue-50 font-bold text-4xl ">
        Wellcome to m<span className="text-5xl text-blue-500">P</span>air's Lab
      </h1>
      <div className="text-white flex gap-4 items-center">
        <p>Goto Protected Route</p>{" "}
        <Link
          to={"/protected"}
          className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 duration-300"
        >
          Click Here
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg ">
        <img
          src="https://images.template.net/wp-content/uploads/2018/07/Technology-Banner.jpg"
          alt=""
          className="hover:scale-110 duration-300"
        />
      </div>
    </div>
  );
};

export default Home;
