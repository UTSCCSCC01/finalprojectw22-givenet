import { useMemo, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { TokenContext } from "./TokenContext";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

import "bootstrap/dist/css/bootstrap.min.css";
import TaggingPage from "./pages/TaggingPage";

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
					<Route path="/tagging" element={<TaggingPage />} />
				</Routes>
			</TokenContext.Provider>
		</div>
	);
}
