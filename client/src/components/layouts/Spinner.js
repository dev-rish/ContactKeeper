import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <>
    <img
      src={spinner}
      alt="Loading..."
      className="src"
      stlye={{ width: "200px", margin: "auto", display: "block" }}
    />
  </>
);

export default Spinner;
