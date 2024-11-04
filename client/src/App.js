import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Points from "./components/layout/Points";
import Landing from "./components/layout/Landing";
import { loadUser } from "./actions/auth";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { connect } from "react-redux";
import Leaderboard from "./components/layout/Leaderboard";
import Evaluate from "./components/layout/Evaluate";
import FormLink from "./components/layout/FormLink";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Fragment>
          <div className="relative flex">
            <div className="flex-1 h-fit">
              <Navbar />

              <section>
                {/* <Alert /> */}
                <Routes>
                  <Route exact path="/" element={<Landing />} />
                  {/* //modify this */}
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />

                  {/*  after this*/}
                  <Route element={<PrivateRoute />}>
                    {/**private routes we can start from here what we wanto  */}
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/points" element={<Points />} />
                    <Route
                      exact
                      path="/leaderboard"
                      element={<Leaderboard />}
                    />
                    <Route exact path="/admin" element={<Evaluate />} />
                    <Route exact path="/admin/form" element={<FormLink />} />
                  </Route>
                </Routes>
              </section>
            </div>
          </div>
        </Fragment>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);
