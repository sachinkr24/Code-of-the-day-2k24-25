import React, { useEffect} from "react";
import { connect } from "react-redux";
import { setLink } from "../../actions/auth";
import { Facebook, Instagram, Mail,Link} from "lucide-react";


const Dashboard = ({ link }) => {
 

  useEffect(() => {
    document.title = "Problems";
  }, []);





  return (
    <div className="min-h-screen container mx-auto pt-24 px-2">
      {/* Top Bar with Team Name and Welcome Message */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-800  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50  shadow-md shadow-black d border-b border-white shadow-lg shadow-white text-white p-4 rounded-lg mb-6 text-center">
        <h2 className="text-2xl font-semibold">
           Welcome to the Solution Submission Dashboard
        </h2>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Problem Statements</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* First Year Problem Statement */}
        <div className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">First Year</h2>
          <p>
            <a
              href="https://drive.google.com/drive/folders/10EykNROWKDVGCv-Vuzlw_XjdbxGsv6u5?usp=drive_link"
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Problem
            </a>
          </p>
        </div>

        {/* Second Year Problem Statement */}
        <div className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Second Year</h2>
          <p>
            <a
              href="https://drive.google.com/drive/folders/10NH-xZ8FoUl3F0zTDVsJbd50KpKp1xGK?usp=drive_link"
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Problem
            </a>
          </p>
        </div>

        {/* Third Year Problem Statement */}
        <div className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Third Year</h2>
          <p>
            <a
              href="https://drive.google.com/drive/folders/10VF9Jpo9IddZGZ6020fDZzzRTruX7tFM?usp=drive_link"
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Problem
            </a>
          </p>
        </div>
      </div>

      {/* Submit Solution Section */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <p className="text-lg font-semibold mb-4">
          Submit Your Solution
        </p>
        <a
  href="https://forms.gle/Dd74H2RN8nUy7fug9"
  
  className="inline-block w-full md:w-1/2"
>
  <button
    type="button"
    className="inline-block w-full md:w-1/2 w-full py-2 text-sm font-medium rounded-md text-white bg-gradient-to-br from-indigo-600 to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-black transition-shadow duration-300"
  >

    Click Here to Submit
  </button>
</a>

      </div>

      {/* Social Media Links */}
      <div className="flex justify-center mt-4 space-x-4 lg:mt-20 py-4">
       
        <a href="mailto:electromania.eced@gmail.com">
          <Mail className="h-10 w-12 text-slate-300 rounded-full border-2 p-[5px] hover:transition duration-200 ease hover:bg-slate-600" />
        </a>
        <a href="https://www.facebook.com/avishkar.electromania?mibextid=rS40aB7S9Ucbxw6v" target='_blank' rel='noopener noreferrer'>
          <Facebook className="h-10 w-12 text-slate-300 rounded-full border-2 p-[5px] hover:transition duration-200 ease hover:bg-slate-600" />
        </a>
        <a href="https://www.instagram.com/p/DBsagmeP8Ih/?igsh=MW54MTcwNGk0MW9zOQ==" target='_blank' rel='noopener noreferrer'>
          <Instagram className="h-10 w-12 text-slate-300 rounded-full border-2 p-[5px] hover:transition duration-200 ease hover:bg-slate-600" />
        </a>
        <a href="http://electronics-society.org/" target='_blank' rel='noopener noreferrer'>
          <Link className="h-10 w-12 text-slate-300 rounded-full border-2 p-[5px] hover:transition duration-200 ease hover:bg-slate-600" />
        </a>
      </div>

      {/* Footer */}
      <div className="flex justify-center">
        <p className="text-center text-gray-500 pb-4">
          &copy; {new Date().getFullYear()} All rights reserved by Code Of The Day.
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  link: state.auth.link,
});

export default connect(mapStateToProps, { setLink })(Dashboard);
