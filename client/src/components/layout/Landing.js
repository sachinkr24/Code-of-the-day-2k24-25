import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  useEffect(() => {
    document.title = "COD 2k24";
  }, []);
  return (
    <section className="h-screen bg-gradient-to-b from-black to-gray-800 flex justify-center items-center" >
        <div className="">
          <Link
            to="/register"
            class="m-3 py-2 px-4 text-md text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            class="py-2 px-4 text-md text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Login
          </Link>
        </div>
    </section>
  );
};

export default Landing;
