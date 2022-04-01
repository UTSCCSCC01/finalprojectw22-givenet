import React from 'react';
import MapContainer from '../components/Map';
import Navbar from "../components/Navbar";
import ViewListings from '../components/ViewListings';

const ListingsPage = () => {
  return (
    <div>
        <Navbar />
        <h1 id="view-listings-title">ALL ACTIVE LISTINGS</h1>
        <ViewListings isUserListings={false}/>
        <MapContainer />
    </div>

  )
}

export default ListingsPage