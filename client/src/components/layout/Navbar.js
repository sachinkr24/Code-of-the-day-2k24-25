import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Transition } from "@headlessui/react";
import logo from '../../img/LOGO.png';

function Navbar({ auth: { isAuthenticated, loading, isAdmin }, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const authLinks = (
    <div>
      <Link
        to="#!"
        onClick={logout}
        className=" hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
      >
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </Link>
    </div>
  );

  const guestLinks = (
    <>
      <Link
        to="/register"
        className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
      >
        Register
      </Link>

      <Link
        to="/login"
        className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
      >
        Login
      </Link>
    </>
  );

  return (
    <nav className="bg-gradient-to-br from-indigo-600 to-purple-800  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50  shadow-md shadow-black w-full fixed z-50 border-b border-white shadow-lg shadow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div id="logo" className="">
          
          <div className="text-white text-3xl flex items-center">
  <img src={logo} style={{  height: '70px', marginRight: '4px' }} alt="Logo" />
  Code Of The Day
</div>
</div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-5 flex items-baseline space-x-3">
                <Link
                  to="/dashboard"
                  className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
                >
                  Problems
                </Link>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
                  >
                    Evaluate
                  </Link>
                ) : (
                  <Link
                    to="/points"
                    className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
                  >
                    Points
                  </Link>
                )}
                <Link
                  to="/leaderboard"
                  className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
                >
                  Leaderboard
                </Link>
                {!loading && (
                  <div>{isAuthenticated ? authLinks : guestLinks}</div>
                )}
                {isAdmin && (
                  <Link
                    to="/admin/form"
                    className=" hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm "
                  >
                    Upload Form
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/dashboard"
                className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>

              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
