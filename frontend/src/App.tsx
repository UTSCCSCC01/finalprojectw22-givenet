import { useMemo, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { TokenContext } from "./TokenContext";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MyListingsPage from "./pages/MyListingsPage";

import "bootstrap/dist/css/bootstrap.min.css";
import TaggingPage from "./pages/TaggingPage";

import ListingsPage from "./pages/ListingsPage";
import CreateListingPage from "./pages/CreateListingPage";

import ListingFiltersPage from "./pages/ListingFiltersPage";
import CharityWantPage from "./pages/CharityWantPage"


import Pickup from "./pages/Pickup";

import PastPickups from "./pages/PastPickupPage";

export default function App() {
	const [token, setToken] = useState("");
	const value = useMemo(() => ({ token, setToken }), [token, setToken]);
	return (
		<div className="App">
			<header className="App-header"></header>
			<TokenContext.Provider value={value}>
				<Routes>
					<Route path="/" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/profile/listings" element={<CreateListingPage />} />
					<Route path="/tagging" element={<TaggingPage />} />
					<Route path="/viewlistings" element={<ListingsPage />} />
					<Route path="/wanted" element={<CharityWantPage />} />
					<Route path="/pickups" element={<Pickup />} />
					<Route path="/mylistings" element={<MyListingsPage />} />
					<Route path="/listingfilters" element={<ListingFiltersPage />} />
					<Route path="/pickups/past" element={<PastPickups />} />
				</Routes>
			</TokenContext.Provider>
		</div>
	);
}