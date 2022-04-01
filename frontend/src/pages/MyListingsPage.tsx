import React from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listings";
import ViewListings from "../components/ViewListings";

export default function CreateListingPage() {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="mt-5">Active Listings</h1>
                <ViewListings isUserListings={true} type={1}/>
                <h1 className="mt-5">Unclaimed Listings</h1>
                <ViewListings isUserListings={true} type={3}/>
                <h1 className="mt-5">All Listings</h1>
                <ViewListings isUserListings={true} type={2}/>
            </div>
        </div>
    );
}
