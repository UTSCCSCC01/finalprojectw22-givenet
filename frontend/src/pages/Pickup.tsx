import React, {useContext, useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import ViewMyPickups from "../components/ViewMyPickups";
import NewPickup from "../components/NewPickup";


const Pickup = () => {

  return (
    <div id="subrootdiv">
      <Navbar />
      <ViewMyPickups />
    </div>
  );
};

export default Pickup;
