import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";

const Landing = () => {
  useEffect(() => {
    document.title = "COD 2k24-25";
  }, []);
  return (
    <Login/>
  );
};

export default Landing;
