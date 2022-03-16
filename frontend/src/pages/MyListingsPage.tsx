import React from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listings";
import ViewListings from "../components/ViewListings";

export default function CreateListingPage() {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="mt-5">My listings</h1>
                <ViewListings isUserListings={true}/>
            </div>
        </div>
    );
}
