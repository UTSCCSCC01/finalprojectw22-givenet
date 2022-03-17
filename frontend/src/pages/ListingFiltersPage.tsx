import React from 'react';
import Navbar from "../components/Navbar";
import ListingFilters from '../components/ListingFilters';

const ListingFiltersPage = () => {
  return (
    <div>
        <Navbar />
        <h1 id="view-listings-title">LISTING SEARCH SYSTEM</h1>
        <ListingFilters isUserListings={false}/>
    </div>

  )
}

export default ListingFiltersPage