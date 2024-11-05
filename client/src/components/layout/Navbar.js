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
        className="hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
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
        className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
      >
        Login
      </Link>
    </>
  );

  return (
    <nav className="bg-gradient-to-br from-indigo-600 to-purple-800 shadow-md w-full fixed z-50 border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div id="logo" className="flex items-center">
            <img src={logo} style={{ height: '60px', marginRight: '8px' }} alt="Logo" />
            <span className="text-white text-3xl">Circuit Of The Day</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3">
            <Link to="/dashboard" className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm">
              Problems
            </Link>
            {isAdmin ? (
              <Link to="/admin" className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm">
                Evaluate
              </Link>
            ) : (
              <Link to="/points" className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm">
                Points
              </Link>
            )}
            <Link to="/leaderboard" className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm">
              Leaderboard
            </Link>
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
            {isAdmin && (
              <Link to="/admin/form" className="hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm">
                Upload Form
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
              Problems
            </Link>
            {isAdmin ? (
              <Link to="/admin" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                Evaluate
              </Link>
            ) : (
              <Link to="/points" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                Points
              </Link>
            )}
            <Link to="/leaderboard" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
              Leaderboard
            </Link>
            {!loading && (
              isAuthenticated ? (
                <>
                  {authLinks}
                  {isAdmin && (
                    <Link to="/admin/form" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                      Upload Form
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                    Register
                  </Link>
                  <Link to="/login" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </Link>
                </>
              )
            )}
          </div>
        </div>
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
