import React from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listings";


export default function CreateListingPage() {
	return (
		<div className="mb-5">
			<Navbar />
			<Listing/>
		</div>
	);
}