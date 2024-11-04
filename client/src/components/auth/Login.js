import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth"; // Ensure your login action handles errors
import PropTypes from "prop-types";
import Header from "./Header";

const Login = ({ login, isAuthenticated, isAdmin }) => {
  useEffect(() => {
    document.title = "LogIn";
  }, []);

  const [formData, setFormData] = useState({
    teamName: "",
    password: "",
  });

  const { teamName, password } = formData;

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(null); // Reset error before login attempt
    try {
      await login(teamName, password);
    } catch (err) {
      setError(err.message); // Set error message from the login action
    } finally {
      setLoading(false); // Reset loading to false
    }
  };

  if (isAuthenticated && isAdmin) return <Navigate to="/admin" />;
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const inputClass =
    "rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm";

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-24">
      <div className="text-white w-1/2 md:w-4/12 p-2 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-md shadow-white">
        <Header
          heading="Login"
          paragraph="Don't have an account? "
          linkName="Register"
          linkUrl="/register"
        />
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={onSubmit} className="space-y-6">
          <input
            type="text"
            name="teamName"
            value={teamName}
            placeholder="Team Name"
            required
            onChange={onChange}
            className={inputClass}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={onChange}
            className={inputClass}
          />
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium rounded-md text-white bg-gradient-to-br from-indigo-600 to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-white transition-shadow duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : 'Login'} {/* Show loading text */}
          </button>
        </form>
      </div>
      
    </section>

    
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
