import React from "react";
import Navbar from "../components/Navbar";
import ViewMyPickups from "../components/ViewMyPickups";

const ViewPickupDemo = () => {
  return (
    <div id="subrootdiv">
      <Navbar />
      <h1 id="view-listings-title">MY PICKUPS</h1>
      <ViewMyPickups />
    </div>
  );
};

export default ViewPickupDemo;
