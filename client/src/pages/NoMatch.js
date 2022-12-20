// === PACKAGE IMPORT ===
import React from "react";
import {
  GiTrumpet,
  GiTuba,
  GiTrombone,
  GiViolin,
  GiFlute,
} from "react-icons/gi";

// This was a passion project
const NoMatch = () => {
  return (
    <div className="flex-row justify-center col-10">
      <h1 className="flex-row col-10 justify-space-between mt-5 mb-5">
        <GiTrombone />
        <GiTrombone />
        <GiTrombone />
        <GiTrombone />
        <GiTrombone />
      </h1>
      <h1 className="col-10 flex-row justify-space-between text-center mt-5 mb-5">
        <GiViolin />
        OH NO!
        <GiViolin />
      </h1>
      <h1 className="flex-row col-10 justify-space-between mt-5 mb-5">
        <GiTrumpet />
        <GiTrumpet />
        <GiTrumpet />
        <GiTrumpet />
        <GiTrumpet />
      </h1>
      <h3 className="col-10 flex-row justify-space-between text-center mt-5 mb-5">
        <GiFlute />
        This page doesn't exist...
        <GiFlute />
      </h3>
      <h1 className="flex-row col-10 justify-space-between mt-5 mb-5">
        <GiTuba />
        <GiTuba />
        <GiTuba />
        <GiTuba />
        <GiTuba />
      </h1>
    </div>
  );
};

// Export page for no matching route
export default NoMatch;
