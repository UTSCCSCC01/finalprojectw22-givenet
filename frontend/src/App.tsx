import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { TokenContext } from "./TokenContext";

function App() {
	const [tokenState, setTokenState] = useState("");

	return (
		<div className="App">
			<header className="App-header">
				{/* <SignUpPage /> */}
				<TokenContext.Provider value={{ tokenState, setTokenState }}>
					<LoginPage />
				</TokenContext.Provider>
			</header>
		</div>
	);
}

export default App;
