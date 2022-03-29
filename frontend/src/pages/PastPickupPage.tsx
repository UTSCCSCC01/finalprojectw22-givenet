import React from "react";
import Navbar from "../components/Navbar";
import DonationHistory from "../components/DonationHistory";

export default function CreateListingPage() {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="mt-5">Completed Pickups</h1>
                <DonationHistory />
            </div>
        </div>
    );
}
