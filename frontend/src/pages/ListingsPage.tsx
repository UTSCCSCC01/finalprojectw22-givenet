import React from 'react';
import Navbar from "../components/Navbar";
import ViewListings from '../components/ViewListings';

const ListingsPage = () => {
  return (
    <div>
        <Navbar />
        <h1 id="view-listings-title">ALL ACTIVE LISTINGS</h1>
        <ViewListings isUserListings={false}/>
    </div>

  )
}

export default ListingsPage