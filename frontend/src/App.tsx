import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TaggingPage from "./pages/TaggingPage";
import ProfilePage from "./SideBar";
import { TokenContext } from "./TokenContext";
import { Routes, Route, Link } from "react-router-dom";
import ListingPage from "./pages/Listings";

function App() {
	const [tokenState, setTokenState] = useState("");

	return (
		<div className="App">
			<header className="App-header"></header>
			<Routes>
				<Route path="/" element={<SignUpStuff />} />
				<Route path="profile" element={<Profile />} />
				<Route path="profile/listings" element={<ListingPage />} />
				<Route path="profile/listings/delete" element={<Profile />} />
			</Routes>
		</div>
	);
}

function SignUpStuff() {
	const [tokenState, setTokenState] = useState("");

	return (
		<div>		
      <TaggingPage />
			<SignUpPage />
			<TokenContext.Provider value={{ tokenState, setTokenState }}>
				<LoginPage />
			</TokenContext.Provider>

			<button>Logout</button>
		</div>
	)
}

function Profile() {
	return (
		<ProfilePage />
	)
}
export default App;
