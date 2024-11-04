import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth"; // Ensure this action handles async calls
import Header from "./Header";

const Register = ({ setAlert, register, isAuthenticated }) => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const [formData, setFormData] = useState({
    teamName: "",
    password: "",
    password2: "",
    name1: "",
    name2: "",
    regNo1: "",
    regNo2: "",
    year1: "",
    year2: "",
    branch1: "",
    branch2: "",
  });

  const {
    teamName,
    password,
    password2,
    name1,
    name2,
    regNo1,
    regNo2,
    year1,
    year2,
    branch1,
    branch2,
  } = formData;

  const [loading, setLoading] = useState(false); // Loading state

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      setLoading(true); // Set loading to true
      try {
        await register({
          teamName,
          password,
          name1,
          name2,
          regNo1,
          regNo2,
          year1,
          year2,
          branch1,
          branch2,
        });
        setAlert("User created", "success");
      } catch (error) {
        // Handle registration error (e.g., setAlert(error.message, "danger"))
        setAlert("Registration failed. Please try again.", "danger");
      } finally {
        setLoading(false); // Reset loading to false
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const fixedInputClass =
    "rounded-lg w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 ease-in-out hover:shadow-md";

  return (
    <Fragment>
      <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-24">
        <div className="text-white w-1/2 md:w-4/12 p-2 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-md shadow-white">
          <Header
            heading="Create Your Account"
            paragraph="Already have an account?"
            linkName="Login"
            linkUrl="/login"
          />
          <form className="space-y-6" onSubmit={(e) => onSubmit(e)}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Team Name *"
                name="teamName"
                value={teamName}
                required
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="password"
                placeholder="Password *"
                name="password"
                value={password}
                required
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="password"
                placeholder="Confirm Password *"
                name="password2"
                value={password2}
                required
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="text"
                placeholder="Member 1 *"
                name="name1"
                value={name1}
                required
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="text"
                placeholder="Member 2"
                name="name2"
                value={name2}
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="text"
                placeholder="Registration No. (Member 1) *"
                name="regNo1"
                value={regNo1}
                required
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <input
                type="text"
                placeholder="Registration No. (Member 2)"
                name="regNo2"
                value={regNo2}
                onChange={(e) => onChange(e)}
                className={fixedInputClass}
              />
              <select
                required
                name="year1"
                value={year1}
                className={fixedInputClass}
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Year *</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </select>
              <select
                name="year2"
                value={year2}
                className={fixedInputClass}
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </select>
              <select
                required
                name="branch1"
                value={branch1}
                className={fixedInputClass}
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Branch *</option>
                <option value="ECE">Electronics & Communication Engineering</option>
                <option value="EE">Electrical Engineering</option>
              </select>
              <select
                name="branch2"
                value={branch2}
                className={fixedInputClass}
                onChange={(e) => onChange(e)}
              >
                <option value="">Select Branch</option>
                <option value="ECE">Electronics & Communication Engineering</option>
                <option value="EE">Electrical Engineering</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-sm font-medium rounded-md text-white bg-gradient-to-br from-indigo-600 to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-white transition-shadow duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Sign Up'} {/* Show loading text */}
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
