import React from "react";
import Navbar from "../components/Navbar";
import ViewListings from "../components/ViewListings";

const ListingsPage = () => {
  return (
    <div id="subrootdiv">
      <Navbar />
      <h1 id="view-listings-title">ALL ACTIVE LISTINGS</h1>
      <ViewListings />
    </div>
  );
};

export default ListingsPage;
