import React from "react";
import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <div>
      <Link to={"/"}> Home </Link>
      <Link to={"/new"}> New </Link>
      <Link to={"/edit"}> Edit </Link>
      <Link to={"/diary"}> Diary </Link>
    </div>
  );
};

export default RouteTest;
