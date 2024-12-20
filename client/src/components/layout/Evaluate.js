import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
const Evaluate = () => {
  useEffect(() => {
    document.title = "Evaluate";
  }, []);
  const [formData, setFormData] = useState({
    teamName: "",
    day: "",
    points: "",
  });
  const { teamName, day, points } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("here is the fp");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ teamName, day, points });
    setFormData({
      teamName: "",
      day: "",
      points: "",
    });
    alert("Points Updated Successfully");
    try {
      console.log(body);
      const res = await axios.post(
        "https://code-of-the-day-2k24-25-1.onrender.com/api/admin",
        body,
        config
      );
      console.log(res);
    } catch (err) {
      console.log("Unknown error ocurred. Please try again later!");
      console.log(err.msg);
    }
  };
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  return (
    <div className="min-h-screen pt-24 flex justify-center items-center">
      <form
        className="mt-8 space-y-6 mx-3 w-full md:w-1/2  p-4 rounded-md shadow-md shadow-black"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="">
          <p className="text-black text-center text-4xl font-bold">Evaluate</p>
          <div className="my-5 mx-5">
            <input
              type="text"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              required
              onChange={(e) => onChange(e)}
              className={fixedInputClass}
            />
          </div>
          <div className="my-5 mx-5">
            <input
              type="number"
              placeholder="Day (eg. 1, 2, 3)"
              name="day"
              minLength="6"
              value={day}
              required
              className={fixedInputClass}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="my-5 mx-5">
            <input
              type="number"
              placeholder="Points"
              name="points"
              minLength="6"
              value={points}
              required
              className={fixedInputClass}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        {/* //Button */}
        <>
          {
            <button
              type="submit"
              className="flex justify-center w-1/2 mx-auto py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mt-10"
              value="Evaluate"
            >
              {" "}
              Submit
            </button>
          }
        </>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setAlert })(Evaluate);
